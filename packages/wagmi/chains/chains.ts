/* eslint-disable */
import { rinkeby as defaultRinkeby, mainnet as defaultMainnet, goerli as defaultGoerli } from 'wagmi/chains'
import { Chain } from 'wagmi'
import { EVM_PROD_NODE } from 'utils/providers'

export const evmTest: Chain = {
  id: 15557,
  name: 'EOS test Network',
  network: 'evm-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EOS Chain Native Token',
    symbol: 'EOS',
  },
  rpcUrls: {
    default: 'https://api.testnet.evm.eosnetwork.com',
    // https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key
    // nodeReal: 'https://evm-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
  },
  blockExplorers: {
    default: {
      name: 'EvmScan',
      url: 'https://explorer.testnet.evm.eosnetwork.com',
    },
  },
  multicall: {
    address: '0x9C8E83bc1E0F0a2A1D89504e59F71dB23379a81F',
    blockCreated: 0,
  },
  testnet: true,
}

export const evmTest1: Chain = {
  id: 15556,
  name: 'Trust test1 Network',
  network: 'evm-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EOS Chain Native Token',
    symbol: 'EOS',
  },
  rpcUrls: {
    default: 'https://api.testnet.evm.eosnetwork.com',
  },
  blockExplorers: {
    default: { name: 'EvmScan', url: 'https://explorer2-testnet.trust.one' },
  },
  multicall: {
    address: '0x9C8E83bc1E0F0a2A1D89504e59F71dB23379a81F',
    blockCreated: 0,
  },
  testnet: true,
}

export const evm: Chain = {
  id: 17777,
  name: 'EOS Network',
  network: 'evm-net',
  nativeCurrency: {
    decimals: 18,
    name: 'EOS Chain Native Token',
    symbol: 'EOS',
  },
  rpcUrls: {
    default: EVM_PROD_NODE,
    // default: 'https://api.evm.eosnetwork.com',
    // default: 'https://api-evm.public.pro',
  },
  blockExplorers: {
    default: {
      name: 'EvmScan',
      url: 'https://explorer.evm.eosnetwork.com',
    },
  },
  multicall: {
    address: '0x9C8E83bc1E0F0a2A1D89504e59F71dB23379a81F',
    blockCreated: 0,
  },
  testnet: false,
}

export const rinkeby: Chain = {
  ...defaultRinkeby,
  rpcUrls: {
    ...defaultRinkeby.rpcUrls,
    // https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key
    nodeReal: 'https://eth-rinkeby.nodereal.io/v1/a4da384bf3334c5ea992eb0bf44135e0',
  },
}

export const mainnet: Chain = {
  ...defaultMainnet,
  rpcUrls: {
    ...defaultMainnet.rpcUrls,
    // https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key
    nodeReal: 'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
  },
}

export const goerli: Chain = {
  ...defaultGoerli,
  rpcUrls: {
    ...defaultGoerli.rpcUrls,
    // https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key
    nodeReal: 'https://eth-goerli.nodereal.io/v1/8a4432e42df94dcca2814fde8aea2a2e',
  },
}
