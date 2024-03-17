/* eslint-disable */
import { axiosInstance } from '../service'

export default function chainUtils(chainId = 17777) {
  let BASE_URL = ''
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = process.env.NEXT_PUBLIC_API_URL
  } else {
    BASE_URL = process.env.NEXT_PUBLIC_API_URL
    // BASE_URL = typeof window !== 'undefined' ? window.location.origin + '/api' : ''
  }

  return {
    // baseURL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL : useBaseURL(),
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: BASE_URL,
    chainid: process.env.NEXT_PUBLIC_CHAIN_ID,
  }
}
