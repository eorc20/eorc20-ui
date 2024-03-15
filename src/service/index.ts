/* eslint-disable */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { ssrWindow } from 'ssr-window';
// import { showMessage } from './status'

const ENV = process.env.NODE_ENV
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL


// 返回res.data的interface
export interface IResponse {
  code: number | string
  data: any
  message: string
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    // chainid: 15557,
    chainid: 17777,
  },
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    }
    // showMessage(response.status || 400)
    return response
  },
  // 请求失败
  (error: any): any => {
    return {
      code: 0,
      message: 'Network Error!',
      data: [],
    }
    // return Promise.reject({
    //   code: 400,
    //   message: 'Network Error!',
    // })
  },
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    console.log(error, 'error')
    return Promise.reject(error)
  },
)
