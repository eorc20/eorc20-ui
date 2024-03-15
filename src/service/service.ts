/* eslint-disable */
import { axiosInstance, IResponse } from './index'

export type QueryFn = (params: any) => Promise<IResponse>

/**
 * @description: tokens get user balance
 * @params
 * @return {Promise}
 */
export const getTokens = (params: any, { baseURL, chainid }: any = {}): Promise<IResponse> => {
  // @ts-ignore
  axiosInstance.defaults.headers.chainid = chainid || 17777
  axiosInstance.defaults.baseURL = baseURL
  return axiosInstance.get('/tokens', {params}).then((res) => res?.data)
}

// get Supply
export const getSupply = ({ baseURL, chainid }: any = {}): Promise<IResponse> => {
  // @ts-ignore
  axiosInstance.defaults.headers.chainid = chainid || 17777
  axiosInstance.defaults.baseURL = baseURL
  return axiosInstance.get('/supply').then((res) => res?.data)
}

// get Holders
export const getHolders = (params: any, { baseURL, chainid }: any = {}): Promise<IResponse> => {
  // @ts-ignore
  axiosInstance.defaults.headers.chainid = chainid || 17777
  axiosInstance.defaults.baseURL = baseURL
  return axiosInstance.get('/holders', {params}).then((res) => res?.data)
}