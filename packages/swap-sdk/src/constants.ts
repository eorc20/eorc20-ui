import JSBI from 'jsbi'
import { Token } from './entities/token'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  EVM = 56,
  EVM_TESTNET = 15557,
  EVM_TESTNET1 = 15556,
  EVM_NET = 17777,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

// // TODO: ETH This is test version, do not depends on it
const FACTORY_ADDRESS_ETH = '0xD93801d7D3a368D94A3A32E97A20f7aC1948a5dB'

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: FACTORY_ADDRESS_ETH,
  [ChainId.EVM]: FACTORY_ADDRESS,
  [ChainId.EVM_TESTNET]: '0x7A453D7174799db84AE4EAdd0dDA0662bE954B56',
  [ChainId.EVM_NET]: '0x75782A57c6522B8B17FCc01Ff11759f4535b2752',
  [ChainId.EVM_TESTNET1]: '0x7A453D7174799db84AE4EAdd0dDA0662bE954B56',
}
export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

const INIT_CODE_HASH_ETH = '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.RINKEBY]: INIT_CODE_HASH_ETH,
  [ChainId.GOERLI]: INIT_CODE_HASH_ETH,
  [ChainId.EVM]: INIT_CODE_HASH,
  [ChainId.EVM_TESTNET]: '0xa6b26402ddb47609a12397932ea9563f6d23b8a0e91815a74e73c4358e3a2338',
  [ChainId.EVM_NET]: '0xa6b26402ddb47609a12397932ea9563f6d23b8a0e91815a74e73c4358e3a2338',
  [ChainId.EVM_TESTNET1]: '0xa6b26402ddb47609a12397932ea9563f6d23b8a0e91815a74e73c4358e3a2338',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _10000 = JSBI.BigInt(10000)

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.GOERLI]: new Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

// WEOS
export const WEOS = {
  [ChainId.EVM_NET]: new Token(
    ChainId.EVM_NET,
    '0xc00592aa41d32d137dc480d9f6d0df19b860104f',
    18,
    'WEOS',
    'Wrapped EOS',
    'https://explorer.evm.eosnetwork.com'
  ),
}

// WEOS
export const WEVM = {
  [ChainId.EVM_TESTNET]: new Token(
    ChainId.EVM_TESTNET,
    '0x6cCC5AD199bF1C64b50f6E7DD530d71402402EB6',
    18,
    'WEOS',
    'Wrapped EOS',
    'https://explorer.testnet.evm.eosnetwork.com'
  ),
}

export const WEVM1 = {
  [ChainId.EVM_TESTNET]: new Token(
    ChainId.EVM_TESTNET,
    '0x6cCC5AD199bF1C64b50f6E7DD530d71402402EB6',
    18,
    'WEOS',
    'Wrapped EOS',
    'https://explorer.testnet.evm.eosnetwork.com'
  ),
}

export const WNATIVE: Record<number, Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GOERLI]: WETH9[ChainId.GOERLI],
  [ChainId.EVM_NET]: WEOS[ChainId.EVM_NET],
  [ChainId.EVM_TESTNET]: WEVM[ChainId.EVM_TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.RINKEBY]: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
  [ChainId.GOERLI]: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
  [ChainId.EVM]: {
    name: '',
    symbol: 'EOS',
    decimals: 18,
  },
  [ChainId.EVM_NET]: {
    name: 'EVM Native Token',
    symbol: 'EOS',
    decimals: 18,
  },
  [ChainId.EVM_TESTNET]: {
    name: 'EVM Native Token',
    symbol: 'EOS',
    decimals: 18,
  },
}
