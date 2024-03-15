import { ChainId } from '@inscription/sdk'
import store from 'state'
import { GAS_PRICE_GWEI } from 'state/types'

/**
 * @deprecated not recommend to get state out of redux hook
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (chainId = ChainId.EVM): string => {
  const state = store.getState()
  const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default
  return chainId === ChainId.EVM ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
