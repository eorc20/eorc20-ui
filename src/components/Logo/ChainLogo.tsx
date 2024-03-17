import Image from 'next/future/image'
import { HelpIcon } from '@inscription/uikit'
import { isChainSupported } from '../../utils/wagmi'
import { memo } from 'react'

export const ChainLogo = memo(({ chainId }: { chainId: number }) => {
  if (isChainSupported(chainId)) {
    if (chainId === 17777) {
      return <img src="/images/chains/17780.png" alt="" width={30} height={30} />
    }
    return <Image src={`/images/chains/${chainId}.png`} width={30} height={30} unoptimized alt="" />
  }

  return <HelpIcon width={24} height={24} />
})
