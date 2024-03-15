import { ChainId } from '@inscription/sdk'
import { BIG_TEN } from 'utils/bigNumber'

export const EVM_BLOCK_TIME = 3

export const BASE_EVM_SCAN_URLS = {
  [ChainId.EVM]: 'https://explorer.evm.eosnetwork.com',
  [ChainId.EVM_NET]: 'https://explorer.evm.eosnetwork.com',
  [ChainId.EVM_TESTNET]: 'https://explorer.testnet.evm.eosnetwork.com',
}

export const PER_BLOCK = 40
export const BLOCKS_PER_YEAR = (60 / EVM_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const PUBLIC_PER_YEAR = PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://public.pro'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_EVM_SCAN_URL = BASE_EVM_SCAN_URLS[ChainId.EVM]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 250000
export const BOOSTED_FARM_GAS_LIMIT = 500000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
