/* eslint-disable */
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { provider } from '../utils/wagmi'
import { Contract } from '@ethersproject/contracts'

// Addresses
import {
  getAddress,
  getMulticallAddress,
  getVoterAddress,
} from '../utils/addressHelpers'

// ABI
import bep20Abi from '../config/abi/erc20.json'
import MultiCallAbi from '../config/abi/Multicall.json'
import VoterAbi from '../config/abi/Voter.json'
import { useRouter } from 'next/router'

// Types
// import type {
//   Erc20,
//   Multicall,
// } from 'config/abi/types'
import { ChainId } from '../../packages/swap-sdk/src/index'

export const getContract = ({
  abi,
  address,
  // chainId = ChainId.EVM_NET,
  // chainId = ChainId.EVM_TESTNET,
  signer,
  chainId,
}: {
  abi: any
  address: string
  chainId?: any
  signer?: Signer | Provider
}) => {
  // console.log(chainId, 'chainId00000000000')
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

// export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
//   return getContract({ abi: bep20Abi, address, signer }) as Erc20
// }

// export const getMulticallContract = (chainId: ChainId) => {
//   return getContract({ abi: MultiCallAbi, address: getMulticallAddress(chainId), chainId }) as Multicall
// }

export const getVoterContract = (chainId, signer?: Signer | Provider) => {
  return getContract({ abi: VoterAbi, address: getVoterAddress(chainId), signer, chainId })
}

