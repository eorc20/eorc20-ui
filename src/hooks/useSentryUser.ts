// import { setUser } from '@sentry/nextjs'
import { useEffect } from 'react'
import { useWeb3React } from '@inscription/wagmi'

function useSentryUser() {
  const { account } = useWeb3React()
  // useEffect(() => {
  //   if (account) {
  //     setUser({ account })
  //   }
  // }, [account])
}

export default useSentryUser
