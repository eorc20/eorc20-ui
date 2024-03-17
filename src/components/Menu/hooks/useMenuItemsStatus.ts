import { useMemo } from 'react'
// import { useActiveIfoWithBlocks } from 'hooks/useActiveIfoWithBlocks'
import { useCurrentBlock } from '../../../state/block/hooks'
import { useCompetitionStatus } from './useCompetitionStatus'

export const useMenuItemsStatus = (): Record<string, string> => {
  const currentBlock = useCurrentBlock()
  // const activeIfo = useActiveIfoWithBlocks()
  const competitionStatus = useCompetitionStatus()

  // const ifoStatus = currentBlock && activeIfo && activeIfo.endBlock > currentBlock ? 'idle' : null

  return useMemo(() => {
    return {
      '/competition': competitionStatus,
      // '/ifo': ifoStatus,
    }
  }, [competitionStatus])
}
