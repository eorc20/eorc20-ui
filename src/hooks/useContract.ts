// import { Erc20, Erc20Bytes32} from 'config/abi/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import { useMemo } from 'react'
// import { getMulticallAddress, getPredictionsV1Address, getZapAddress } from 'utils/addressHelpers'
import { getVoterContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WNATIVE } from '@inscription/sdk'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import multiCallAbi from '../config/abi/Multicall.json'
// import WETH_ABI from '../config/abi/weth.json'
import { getContract } from '../utils'
import { useActiveChainId } from './useActiveChainId'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider

  const canReturnContract = useMemo(() => address && ABI && providerOrSigner, [address, ABI, providerOrSigner])

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner, canReturnContract]) as T
}

// export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
//   return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
// }

// export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
// }

// voter: vote 投票 poke 刷新投票 claimRewards 领取质押奖励 claimBribes 领取贿赂奖励 whitelist 设置token白名单  setVotableGauge 设置可投票池子
export const useVoterContract = () => {
  const { data: signer } = useSigner()
  const { chainId } = useActiveChainId()
  return useMemo(() => getVoterContract(chainId, signer), [chainId, signer])
}

export const useOtherContract = (address, abi) => {
  const { data: signer } = useSigner()
  return useMemo(() => getContract(address, abi, signer), [abi, address, signer])
}
