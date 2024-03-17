/* eslint-disable */
import { useRouter } from 'next/router'
import TickDetails from '@/views/Eorc/tick'

const TickDetailsPage = () => {
  const router = useRouter()
  return <TickDetails tick={String(router.query.tick)} />
}

export default TickDetailsPage
