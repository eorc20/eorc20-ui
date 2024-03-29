import { useCallback } from 'react'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { Modal, ModalBody, Text, Button, Flex, InjectedModalProps } from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
import orderBy from 'lodash/orderBy'
import { isTransactionRecent, useAllTransactions } from '../../../state/transactions/hooks'
import { TransactionDetails } from '../../../state/transactions/reducer'
import { useAppDispatch } from '../../../state'
import { clearAllTransactions } from '../../../state/transactions/actions'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const allTransactions = useAllTransactions()

  const { t } = useTranslation()

  const sortedRecentTransactions = orderBy(
    Object.values(allTransactions).filter(isTransactionRecent),
    'addedTime',
    'desc',
  )

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <Modal title={t('public7')} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      {/* {account ? (
        <ModalBody>
          {!!pending.length || !!confirmed.length ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text>{t('public7')}</Text>
                <Button variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  {t('public30')}
                </Button>
              </AutoRow>
              {renderTransactions(pending)}
              {renderTransactions(confirmed)}
            </>
          ) : (
            <Text color="#85868A">{t('public8')}</Text>
          )}
        </ModalBody>
      ) : ( */}
        <ConnectWalletButton />
      {/* )} */}
    </Modal>
  )
}

export default TransactionsModal
