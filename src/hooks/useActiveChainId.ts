/* eslint-disable */
import { ChainId } from '../../packages/swap-sdk/src/index'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useDeferredValue } from 'react'
import { isChainSupported } from '../utils/wagmi'
import { useNetwork } from 'wagmi'
import { useSessionChainId } from './useSessionChainId'

export const sessionChainIdAtom = atom<number>(0)
const queryChainIdAtom = atom(-1) // -1 unload, 0 no chainId on query

queryChainIdAtom.onMount = (set) => {
  const params = new URL(window.location.href).searchParams
  const c = params.get('chainId')
  if (isChainSupported(+c)) {
    set(+c)
  } else {
    set(0)
  }
}

export function useLocalNetworkChain() {
  const [sessionChainId] = useSessionChainId()
  // useRouter is kind of slow, we only get this query chainId once
  const queryChainId = useAtomValue(queryChainIdAtom)

  const { query } = useRouter()

  let chainId = +(sessionChainId || query.chainId || queryChainId)
  chainId = process.env.NODE_ENV === 'development' ? 17777 : 17777
  // console.log('+++++++++++++++', chainId)
  if (isChainSupported(chainId)) {
    return chainId
  }

  return undefined
}

export const useActiveChainId = () => {
  const localChainId = useLocalNetworkChain()
  const queryChainId = useAtomValue(queryChainIdAtom)

  const { chain } = useNetwork()
  let chainId = localChainId ?? chain?.id ?? (queryChainId >= 0 ? ChainId.EVM_NET : undefined)
  chainId = process.env.NODE_ENV === 'development' ? 17777 : 17777
  const isNotMatched = useDeferredValue(chain && localChainId && chain.id !== localChainId)

  // console.log('----------------', chainId)
  return {
    chainId,
    isWrongNetwork: (chain?.unsupported ?? false) || isNotMatched,
    isNotMatched,
  }
}
