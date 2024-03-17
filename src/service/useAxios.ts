/* eslint-disable */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ssrWindow } from 'ssr-window'
import useActiveWeb3React from '../hooks/useActiveWeb3React'

const useAxios = ({ url, method, body = null, headers = null }: any) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)
  const { chainId } = useActiveWeb3React()
  const ENV = process.env.NODE_ENV

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  useEffect(() => {
    // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + '/swap'
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    axios.defaults.headers['chainid'] = process.env.NEXT_PUBLIC_CHAIN_ID
    fetchData()
  }, [method, url, body, headers, chainId])

  return { response, error, loading }
}

export default useAxios
