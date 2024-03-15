import { memo } from 'react'
import styled from 'styled-components'
import {
  LinkExternal,
  Flex,
  Svg,
  Button,
  useMatchBreakpoints,
} from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
// import { EXCHANGE_DOCS_URLS } from 'config/constants'

const Wrapper = memo(styled.div<{ $isSide: boolean; isMobile: boolean }>`
  width: 100%;
  height: ${({ $isSide }) => ($isSide ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 16px;
  padding-right: ${({ $isSide }) => ($isSide ? '32px' : '0px')};
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: ${({ $isSide }) => ($isSide ? 'column' : 'row')};
  }
  position: absolute;
  bottom: 0;
  left: 0;
`)

const BubbleWrapper = styled(Flex)`
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    transition: background-color 0.2s, opacity 0.2s;
  }
  &:hover {
    svg {
      opacity: 0.65;
    }
  }
  &:active {
    svg {
      opacity: 0.85;
    }
  }
`

type FooterVariant = 'default' | 'side'

const Footer: React.FC<React.PropsWithChildren<{ variant?: FooterVariant; helpUrl?: string }>> = ({
  variant = 'default',
  // helpUrl = EXCHANGE_DOCS_URLS,
}) => {
  const { t } = useTranslation()
  const isSide = variant === 'side'
  const { isMobile } = useMatchBreakpoints()
  return (
    <Wrapper $isSide={isSide} isMobile={isMobile}>
      <Flex
        flexGrow={isSide ? 0 : 1}
        alignItems="center"
        width={['100%', '100%', '100%', isSide ? '100%' : 'auto']}
        justifyContent={['center', 'center', 'center', 'flex-end']}
      >
        {/* {isMobile ? (
          <img className="" src="/images/start/mobile-animal.png" alt="" width="100%" />
        ) : (
          <img className="" src="/images/start/pc-animal.png" alt="" width="100%" />
        )} */}
      </Flex>
    </Wrapper>
  )
}

export default memo(Footer)
