import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const EVM_PROD_NODE = 'https://api.evm.eosnetwork.com'
// export const EVM_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://evm.nodereal.io'

// export const evmRpcProvider = new StaticJsonRpcProvider(EVM_PROD_NODE)
export const evmRpcProvider = null

export default null
