import { ModalV2 } from '@inscription/uikit'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ChainId } from '../../../packages/swap-sdk/src/index'
import { useMemo } from 'react'
import { useNetwork } from 'wagmi'
import { atom, useAtom } from 'jotai'
import { SUPPORT_ONLY_EVM } from '../../config/constants/supportChains'
import { useRouter, NextRouter } from 'next/router'
// import { isChainSupported } from 'utils/wagmi'
import { UnsupportedNetworkModal } from './UnsupportedNetworkModal'
import { WrongNetworkModal } from './WrongNetworkModal'
import { PageNetworkSupportModal } from './PageNetworkSupportModal'

export const hideWrongNetworkModalAtom = atom(false)

const getHashFromRouter = (router: NextRouter) => {
  return router.asPath.match(/#([a-z0-9]+)/gi)
}

export const NetworkModal = ({ pageSupportedChains = SUPPORT_ONLY_EVM }: { pageSupportedChains?: number[] }) => {
  const { chainId, chain, isWrongNetwork } = useActiveWeb3React()
  const { chains } = useNetwork()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)
  const router = useRouter()
  // const parsedQueryChainId = Number(router.query.chainId)
  // const uriHash = getHashFromRouter(router)?.[0]
  // console.log(router.query, 'router.query')

  const pathNameAddress = router.pathname === '/info/pools/[address]'

  // 影响刷新页面被重定向, 现注释
  // if (parsedQueryChainId !== chainId && isChainSupported(chainId)) {
  // const uriHash = getHashFromRouter(router)?.[0]
  // if (!pathNameAddress) {
  // router.replace(
  //       {
  //         query: {
  //           ...router.query,
  //           chainId,
  //         },
  //         ...(uriHash && { hash: uriHash }),
  //       },
  //       undefined,
  //     )
  // } else if (router.query?.address) {
  //   router.replace(
  //     {
  //       query: {
  //         ...router.query
  //       },
  //       ...(uriHash && { hash: uriHash }),
  //     },
  //     undefined,
  //   )
  // }
  // }

  const isEOSOnlyPage = useMemo(() => {
    // return pageSupportedChains?.length === 1 && pageSupportedChains[0] === ChainId.EVM_NET
    return pageSupportedChains[0] === ChainId.EVM_NET || pageSupportedChains[0] === ChainId.EVM_TESTNET
  }, [pageSupportedChains])

  const isPageNotSupported = useMemo(
    () => Boolean(pageSupportedChains.length) && !pageSupportedChains.includes(chainId),
    [chainId, pageSupportedChains],
  )

  if (isPageNotSupported && isEOSOnlyPage) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <PageNetworkSupportModal />
      </ModalV2>
    )
  }

  // console.log(isPageNotSupported, 'isPageNotSupported')
  // console.log(chainId, 'chainIdchainIdchainId')
  // console.log(isEOSOnlyPage, 'isEOSOnlyPageisEOSOnlyPage')
  // console.log(chain?.unsupported, 'chain?.unsupportedchain?.unsupported')
  // console.log(isWrongNetwork, 'isWrongNetworkisWrongNetwork')
  // console.log(dismissWrongNetwork, 'dismissWrongNetworkdismissWrongNetwork')

  if ((chain?.unsupported ?? false) || isPageNotSupported) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <UnsupportedNetworkModal />
      </ModalV2>
    )
  }

  // const routerNotSupported = router.pathname !== '/quotation' && router.pathname !== '/info' && router.pathname !== '/info/pools/[address]'

  if (isWrongNetwork && !dismissWrongNetwork) {
    const currentChain = chains.find((c) => c.id === chainId)
    if (!currentChain) return null
    return (
      <ModalV2 isOpen={isWrongNetwork} closeOnOverlayClick onDismiss={() => setDismissWrongNetwork(true)}>
        <WrongNetworkModal currentChain={currentChain} onDismiss={() => setDismissWrongNetwork(true)} />
      </ModalV2>
    )
  }

  return null
}
