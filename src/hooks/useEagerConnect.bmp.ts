/* eslint-disable no-console */
import { useCallback } from 'react'

import { useTranslation } from '@inscription/localization'
import { MiniProgramConnector } from '@inscription/wagmi/connectors/miniProgram'
import { useConnect } from 'wagmi'
import getWeb3Provider from '../utils/mpBridge'
import { chains } from '../utils/wagmi'
/* eslint max-classes-per-file: off -- noop */
import useToast from './useToast'

const injected = new MiniProgramConnector({ chains, getWeb3Provider })
export const getAccount = () => injected.getAccount()

const useActive = () => {
  const { connectAsync } = useConnect()
  return useCallback(
    () =>
      connectAsync({ connector: injected }).catch((error) => {
        console.log('🚀 ~ file: useEagerConnect.ts ~ line 183 ~ activate ~ error', error)
        // captureException(error)
      }),
    [connectAsync],
  )
}
export const useEagerConnect = () => {
  // noop
}

export const useActiveHandle = () => {
  const handleActive = useActive()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const main = async () => {
    /**
     *  backward
     */
    console.log('~ before getAccount')
    const address = await getAccount()
    console.log('~ after getAccount', address)
    return new Promise((resolve) => {
      handleActive().then(resolve)
    })
  }
  return async (showToast = true) => {
    await main()
    const address = await getAccount()
    if (address && showToast) {
      toastSuccess(t('Success'), 'Wallet connected')
    }
  }
}
export default useEagerConnect
