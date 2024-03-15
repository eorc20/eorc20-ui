import { ChainId } from '@inscription/sdk'

export const verifyEosNetwork = (chainId: number) => {
  return chainId === ChainId.EVM || chainId === ChainId.EVM_NET
}
