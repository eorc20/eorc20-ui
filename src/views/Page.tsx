import styled from 'styled-components'
import { Flex } from '@inscription/uikit'
// import Footer from 'components/Menu/Footer'
// import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from '../config/constants'

const StyledPage = styled.div<{ $removePadding: boolean; $noMinHeight }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '64px 16px 16px 16px')};
  // min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 64px)')};
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};
  background-image: url(/images/home/bg.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  min-height: calc(100vh - 64px);


  @media screen and (min-width: 1440px){
    background-size: 100% auto;
    min-height: 100vh;
  }

  @media screen and (min-width: 968px) and (max-width: 1440px){
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '72px 32px 32px 32px')};
    padding-bottom: 0;
    // // /* min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 100px)')}; */
    // min-height: calc(100vh - 64px);
    height: ${({ $removePadding }) => ($removePadding ? '100%' : '100vh')};
    background-size: 130% auto;
  }

  @media screen and (min-width: 576px) and (max-width: 968px){
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '72px 24px 24px 24px')};
    padding-bottom: 0;
    background-size: 200% auto;
    // height: ${({ $removePadding }) => ($removePadding ? '100%' : '100vh')};
    height: 100%;
  }

  @media screen and (min-width: 370px) and (max-width: 576px){
    background-size: 300% auto;
    min-height: 100vh;
  }


  // ${({ theme }) => theme.mediaQueries.xs} {
  //   background-size: 300% auto;
  //   min-height: 100vh;
  // }

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   padding: ${({ $removePadding }) => ($removePadding ? '0' : '72px 24px 24px 24px')};
  //   padding-bottom: 0;
  //   background-size: 200% auto;
  //   /* height: ${({ $removePadding }) => ($removePadding ? '100%' : '100vh')}; */
  // }

  // ${({ theme }) => theme.mediaQueries.lg} {
  //   padding: ${({ $removePadding }) => ($removePadding ? '0' : '30px 32px 32px 32px')};
  //   padding-bottom: 0;
  //   // /* min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 100px)')}; */
  //   min-height: calc(100vh - 64px);
  // }

  position: relative;
  .img-cls {
    display: block;
    width: 80px;
    position: fixed;
  }
  .img-left {
    left: 3%;
    top: 30%;
  }
  .img-right {
    right: 3%;
    top: 30%;
  }
`

const Page: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      removePadding?: boolean
      hideFooterOnDesktop?: boolean
      noMinHeight?: boolean
      helpUrl?: string
      backImg?: boolean
      isMobile?: boolean
      footer?: boolean
    }
  >
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  backImg = false,
  isMobile = false,
  footer = true,
  ...props
}) => {
  return (
    <>
      {/* <PageMeta /> */}
      <StyledPage $removePadding={removePadding} $noMinHeight={noMinHeight} {...props}>
        {children}
        <Flex flexGrow={1} />
        {/* {footer && <Footer />} */}
        {/* {!isMobile && backImg && <img src="/images/activity/left.png" className="img-left img-cls" alt="" />}
        {!isMobile && backImg && <img src="/images/activity/right.png" className="img-right img-cls" alt="" />} */}
      </StyledPage>
    </>
  )
}

export default Page
