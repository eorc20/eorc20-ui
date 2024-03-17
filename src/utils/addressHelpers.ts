/* eslint-disable */
import { ChainId } from '../../packages/swap-sdk/src/index'
import addresses from '../config/constants/contracts'
// import { Address } from 'config/constants/types'
// import { VaultKey } from 'state/types'

export const getAddress = (address: any, chainId?: number): string => {
  return address[chainId] ? address[chainId] : address[ChainId.EVM]
}

export const getMulticallAddress = (chainId?: number) => {
  return getAddress(addresses.multiCall, chainId)
}


export const getVaultPoolAddress = (vaultKey: any) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey])
}
export const getVoterAddress = (chainId) => {
  return getAddress(addresses.Voter, chainId)
}

