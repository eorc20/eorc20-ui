import { ChainId } from '@inscription/sdk'

// export const SUPPORT_ONLY_EVM = [ChainId.EVM]
export const SUPPORT_ONLY_EVM = [ChainId.EVM_NET, ChainId.EVM_TESTNET]
export const SUPPORT_FARMS = [ChainId.EVM, ChainId.EVM_TESTNET, ChainId.GOERLI, ChainId.EVM_TESTNET]

export const SUPPORT_ZAP = [ChainId.EVM, ChainId.EVM_TESTNET]
