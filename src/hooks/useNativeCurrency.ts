import { ChainId, Native, NativeCurrency } from '../../packages/swap-sdk/src/index'
import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    try {
      return Native.onChain(chainId)
    } catch (e) {
      return Native.onChain(ChainId.EVM_NET)
    }
  }, [chainId])
}
