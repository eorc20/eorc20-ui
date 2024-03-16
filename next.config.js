/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable */
const withTM = require('next-transpile-modules')(['@inscription/uikit', '@inscription/sdk'])

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
  // async redirects() {
  //   return [
  //     // {
  //     //   source: '/',
  //     //   destination: '/swap',
  //     //   permanent: true,
  //     // }
  //   ]
  // },
  staticPageGenerationTimeout: 1000,
}

module.exports = withTM(config)
