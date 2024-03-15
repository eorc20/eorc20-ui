import { CallOverrides } from '@ethersproject/contracts'
import { createMulticall, Call } from '@inscription/multicall'
import { provider } from './wagmi'

export type { Call }

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean
}
const { multicall, multicallv2, multicallv22 } = createMulticall(provider)

export default multicall

export { multicallv2, multicallv22 }
