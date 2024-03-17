import { Box, Button, Flex, Text } from '@inscription/uikit'
import { useAppDispatch } from '../../../state'
import { isTransactionRecent, useAllTransactions } from '../../../state/transactions/hooks'
import { useTranslation } from '@inscription/localization'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { clearAllTransactions } from '../../../state/transactions/actions'
import orderBy from 'lodash/orderBy'
import { useAccount } from 'wagmi'
import TransactionRow from './TransactionRow'

const WalletTransactions: React.FC<React.PropsWithChildren> = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const allTransactions = useAllTransactions()
  const { address: account } = useAccount()
  // const sortedTransactions = orderBy(Object.values(allTransactions).filter(isTransactionRecent), 'addedTime', 'desc')
  const sortedTransactions = orderBy(
    Object.values(allTransactions).filter(isTransactionRecent),
    'addedTime',
    'desc',
  ).filter((v) => v.from === account)
  const handleClearAll = () => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }

  return (
    <Box minHeight="120px">
      {/* <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="#000" fontSize="12px">
          {t('public7')}
        </Text>
        {sortedTransactions.length > 0 && (
          <Button scale="sm" onClick={handleClearAll} variant="text" px="0" style={{ fontSize: '12px', color: '#666' }}>
            {t('public30')}
          </Button>
        )}
      </Flex>
      {sortedTransactions.length > 0 ? (
        <div style={{ overflow: 'auto', height: '200px' }}>
          {sortedTransactions.map((txn) => (
            <TransactionRow key={txn.hash} txn={txn} />
          ))}
        </div>
      ) : (
        // <Text textAlign="center" color="#666" fontSize="12px">
        //   {t('public8')}
        //   </Text>
        <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
          <img src="/images/start/noData.png" width={70} alt="" />
          <Text textAlign="center" maxWidth="400px" fontSize="12px" mt="16px" color="#85868A">
            {t('public8')}
          </Text>
        </Flex>
      )} */}
    </Box>
  )
}

export default WalletTransactions
