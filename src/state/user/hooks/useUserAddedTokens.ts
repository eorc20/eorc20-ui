import { Token } from '../../../../packages/swap-sdk/src/index'
import { createSelector } from '@reduxjs/toolkit'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { deserializeToken } from '@inscription/tokens'
import { useSelector } from 'react-redux'
import { AppState } from '../../index'

const selectUserTokens = ({ user: { tokens } }: AppState) => tokens

export const userAddedTokenSelector = (chainId: number) =>
  createSelector(selectUserTokens, (serializedTokensMap) =>
    Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken),
  )
export default function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  return useSelector(userAddedTokenSelector(chainId))
}
