import { ChainId, Token } from '@inscription/sdk'

export const MAINNET = new Token(
  ChainId.EVM,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'EVM',
  'inscription Token',
  'https://public.pro/',
)

export const INSCRIPTION_TESTNET = new Token(
  ChainId.EVM_TESTNET,
  '0x2e605391386196d79C438Ee51DcD721F7D7C09fe',
  18,
  'EVM',
  'inscription Token',
  'https://public.pro/',
)
export const EVM_NET = new Token(
  ChainId.EVM_NET,
  '0x2a3b2d64960036de519dC4a45CAfd532Bfa99Ff0',
  18,
  'EVM',
  'inscription Token',
  'https://public.pro/',
)

export const USDC_EVM = new Token(
  ChainId.EVM,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'sPeg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new Token(
  ChainId.EVM_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'sPeg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new Token(ChainId.ETHEREUM, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')

export const USDC_RINKEBY = new Token(
  ChainId.RINKEBY,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDC_GOERLI = new Token(
  ChainId.GOERLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDC_EVMNET = new Token(
  ChainId.EVM_NET,
  '0x765277EebeCA2e31912C9946eAe1021199B39C61',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_EVM = new Token(
  ChainId.EVM,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const EUSD_EVM = new Token(
  ChainId.EVM,
  '0x9Ee64589F3c2b935a4D3Fb2b9e820ED38BECd6d4',
  18,
  'EUSD',
  'Binance USD',
  'https://www.paxos.com/eusd/',
)

export const EUSD_TESTNET = new Token(
  ChainId.EVM_TESTNET,
  '0x9Ee64589F3c2b935a4D3Fb2b9e820ED38BECd6d4',
  18,
  'EUSD',
  'Binance USD',
  'https://www.paxos.com/eusd/',
)

export const EUSD_ETH = new Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'EUSD',
  'Binance USD',
  'https://www.paxos.com/eusd/',
)

export const EUSD_RINKEBY = new Token(
  ChainId.RINKEBY,
  '0x4e2442A6f7AeCE64Ca33d31756B5390860BF973E',
  18,
  'EUSD',
  'Binance USD',
  'https://www.paxos.com/eusd/',
)

export const EUSD_GOERLI = new Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'EUSD',
  'Binance USD',
  'https://www.paxos.com/eusd/',
)

export const EUSD_EVMNET = new Token(
  ChainId.EVM_NET,
  '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
  18,
  'USDT',
  'USD',
  'https://explorer.evm.eosnetwork.com/token/0x9Ee64589F3c2b935a4D3Fb2b9e820ED38BECd6d4/token-transfers',
)

export const EUSD_EVMTESTNET = new Token(
  ChainId.EVM_TESTNET,
  '0x9Ee64589F3c2b935a4D3Fb2b9e820ED38BECd6d4',
  18,
  'EUSD',
  'EOS USD',
  'https://explorer.testnet.evm.eosnetwork.com/token/0xA48c57B462A9344be67271d5C93d35dC4f1e0190/token-transfers',
)

export const EUSD_EVMTESTNET1 = new Token(
  ChainId.EVM_TESTNET,
  '0x9Ee64589F3c2b935a4D3Fb2b9e820ED38BECd6d4',
  18,
  'EUSD',
  'EOS USD',
  'https://explorer.testnet.evm.eosnetwork.com/token/0xA48c57B462A9344be67271d5C93d35dC4f1e0190/token-transfers',
)

export const WEOS = new Token(
  ChainId.EVM_NET,
  '0xc00592aa41d32d137dc480d9f6d0df19b860104f',
  18,
  'WEOS',
  'Wrapped EOS',
  'https://explorer.evm.eosnetwork.com',
)

export const EUSD: Record<ChainId, Token> = {
  [ChainId.ETHEREUM]: EUSD_ETH,
  [ChainId.RINKEBY]: EUSD_RINKEBY,
  [ChainId.GOERLI]: EUSD_GOERLI,
  [ChainId.EVM]: EUSD_EVM,
  [ChainId.EVM_NET]: EUSD_EVMNET,
  [ChainId.EVM_TESTNET]: EUSD_EVMTESTNET,
  [ChainId.EVM_TESTNET1]: EUSD_EVMTESTNET1,
}

export const COIN = {
  [ChainId.EVM]: MAINNET,
  [ChainId.EVM_NET]: WEOS,
  [ChainId.EVM_TESTNET]: INSCRIPTION_TESTNET,
}

// COIN1
export const COIN1 = {
  [ChainId.EVM_NET]: EVM_NET,
  [ChainId.EVM_TESTNET]: INSCRIPTION_TESTNET,
}

export const USDC = {
  [ChainId.EVM]: USDC_EVM,
  [ChainId.EVM_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.RINKEBY]: USDC_RINKEBY,
  // [ChainId.EVM_NET]: USDC_EVMNET,
  [ChainId.EVM_NET]: null,
  [ChainId.GOERLI]: USDC_GOERLI,
}

export const USDT = {
  [ChainId.EVM]: USDT_EVM,
  // [ChainId.EVM_NET]: USDT_EVMNET,
  [ChainId.ETHEREUM]: USDT_ETH,
}
