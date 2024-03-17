import { ChainId } from '../../packages/swap-sdk/src/index'

export const verifyEosNetwork = (chainId: number) => {
  return chainId === ChainId.EVM || chainId === ChainId.EVM_NET
}
