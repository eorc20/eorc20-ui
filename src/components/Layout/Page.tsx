import styled from 'styled-components'
import { useTranslation } from '@inscription/localization'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'

import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 0px;
  padding-bottom: 16px;
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 72px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 30px;
    padding-bottom: 32px;
  }
  @media screen and (max-width: 1200px) {
    height: 100%;
    min-height: 100vh;
    // padding-top: 64px;
    // border: 1px solid red;
  }

  // and (min-width: 576px)
  @media screen and (max-width: 968px) {
    // border: 1px solid red;
    padding-top: 64px !important;
  }
`

export const PageMeta: React.FC<React.PropsWithChildren<{ symbol?: string }>> = ({ symbol }) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { pathname } = useRouter()
  // const publicPriceUsdDisplay = publicPriceUsd ? `$${publicPriceUsd.toFixed(3)}` : '...'

  // const pageMeta = getCustomMeta(pathname, t, locale) || {}
  // const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  // let pageTitle = publicPriceUsdDisplay ? [title, publicPriceUsdDisplay].join(' - ') : title
  // if (symbol) {
  //   pageTitle = [symbol, title].join(' - ')
  // }

  return (
    <Head>
      {/* <title>{pageTitle}</title> */}
      {/* <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} /> */}
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
}

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, symbol, ...props }) => {
  // const aa = useRouter()
  // console.log(aa, 'aa')
  // console.log(localStorage.getItem('chainId'))
  return (
    <>
      {/* <PageMeta symbol={symbol} /> */}
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
