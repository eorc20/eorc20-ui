/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable */
const { withSentryConfig } = require('@sentry/nextjs')
const { withAxiom } = require('next-axiom')
// const S3Plugin = require('webpack-s3-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(['@inscription/uikit', '@inscription/sdk'])

const sentryWebpackPluginOptions =
  process.env.VERCEL_ENV === 'production'
    ? {
        // Additional config options for the Sentry Webpack plugin. Keep in mind that
        // the following options are set automatically, and overriding them is not
        // recommended:
        //   release, url, org, project, authToken, configFile, stripPrefix,
        //   urlPrefix, include, ignore
        silent: false, // Logging when deploying to check if there is any problem
        validate: true,
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options.
      }
    : {
        silent: false, // Suppresses all logs
        dryRun: !process.env.SENTRY_AUTH_TOKEN,
      }

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    // domains: ['static-nft.inscription.com'],
    unoptimized: true,
    loader: 'akamai',
    path: '',
  },
  trailingSlash: true,

  // productionSourceMap: false,
  async rewrites() {
    return [
      // {
      //   source: '/info/token/:address',
      //   destination: '/info/tokens/:address',
      // }
      {
        source: '/tick/:tick',
        destination: '/tick/:tick',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/tokens/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/swap',
      //   permanent: true,
      // }
    ]
  },
  staticPageGenerationTimeout: 1000,
  webpack: (webpackConfig, { webpack }) => {
    // tree shake sentry tracing
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    )
    return webpackConfig
  },
}

module.exports = withBundleAnalyzer(withSentryConfig(withTM(withAxiom(config)), sentryWebpackPluginOptions))
