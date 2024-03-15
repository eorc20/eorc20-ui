import { ChainId, Currency } from '@inscription/sdk'
import { BinanceIcon } from '@inscription/uikit'
import { useMemo } from 'react'
import { WrappedTokenInfo } from '@inscription/tokens'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useHttpLocations from '../../hooks/useHttpLocations'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()
  let srcs = []
  if (currency?.symbol === 'EOS' || currency?.symbol === 'WEOS') {
    // srcs = [
    //   `https://s3.ap-southeast-1.amazonaws.com/public.pro/image/17777-0xc00592aa41d32d137dc480d9f6d0df19b860104f-eos.png`,
    // ]
    srcs = [`https://images.public.io/image/17777-0xc00592aa41d32d137dc480d9f6d0df19b860104f-eos.png`]
  } else if (currency?.address && currency?.symbol) {
    // srcs = [
    //   `https://s3.ap-southeast-1.amazonaws.com/public.pro/image/${chainId}-${currency?.address.toLowerCase()}-${currency?.symbol.toLowerCase()}.png`,
    // ]
    srcs = [
      `https://images.public.io/image/${chainId}-${currency?.address.toLowerCase()}-${currency?.symbol.toLowerCase()}.png`,
    ]
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
