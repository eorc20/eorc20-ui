import {
  InjectedModalProps,
  ModalContainer,
  ModalTitle,
  useMatchBreakpoints,
  CloseIcon,
  Heading,
  IconButton,
  Text,
  Flex,
  Button,
  Box,
  Link,
  UserMenuVariant,
} from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import truncateHash from 'utils/truncateHash'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useEffect, useMemo, useState } from 'react'
import { Console } from 'console'

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  display: flex;
  padding: 12px 24px;
`

export const ModalBody = styled(Flex)`
  align-items: center;
  background: transparent;
  display: flex;
  padding: 40px 24px 60px;
  justify-content: center;
  flex-direction: column;
  img {
    display: inline-block;
    margin: 0 auto 25px;
  }
`
const Wrapper = styled.div`
  /* padding-top: 20px; */
  width: 100%;
  min-width: 320px;
  max-width: 420px !important;
  padding-bottom: 80px;
  word-break: break-word;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0px 0 24px;
`

function ConfirmationPendingContent({ pendingText, onDismiss }: { pendingText: string; onDismiss: any }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ModalHeader>
        <ModalTitle />
        {/* onClick={onDismiss} */}
        <IconButton variant="text"><CloseIcon width="24px" color="#000" onClick={onDismiss}/></IconButton>
      </ModalHeader>
      <ConfirmedIcon>
        <img src="/images/start/loadingnew.png" width={68} alt="" />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        {/* 在您的钱包中确认此次操作 */}
        <Text fontSize="20px">{t('Confirm this action in your wallet')}</Text>
        {/* 内容 */}
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center" color="#85868A">
            {pendingText}
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}

export interface ResultModalProps {
  attemptingTxn: boolean
  hash: string
  pendingText: string
  errorMessage: string
  onDismiss?: any
  isSendTransfer?: any
  successText: string
  failText: string
  isSuccess: () => void
  clearInput?: () => void
}

const ResultModal: React.FC<React.PropsWithChildren<ResultModalProps>> = ({
  attemptingTxn,
  hash,
  pendingText,
  errorMessage,
  onDismiss,
  isSendTransfer,
  successText = 'Operation Successful',
  failText = 'Operation Failed',
  isSuccess,
  clearInput,
}) => {
  const { hasPendingTransactions, pendingNumber, receipt } = usePendingTransactions()
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuVariable('pending')
    } else {
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  useEffect(() => {
    if (receipt?.status === 1) {
      isSuccess()
    }
  }, [receipt])
  if (isSendTransfer) {
    receipt.status = 1
  }
  const contTitle = useMemo(() => {
    if (hash && userMenuVariable === 'pending') {
      return t('Submitted operation')
    }
    if (hash && receipt && receipt?.status === 1) {
      return successText
    }
    return failText
  }, [userMenuVariable, hash])

  return (
    <ModalContainer
      $minWidth={isMobile ? '100%' : '418px'}
      $minHeight="auto"
      style={{
        overflow: 'initial',
      }}
    >
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} onDismiss={onDismiss} />
      ) : (
        <Box style={{ width: isMobile ? '100% ' : '418px', height: 'auto' }}>
          <ModalHeader>
            <ModalTitle />
            <IconButton
              variant="text"
              onClick={() => {
                onDismiss()
                if (clearInput && hash) {
                  clearInput()
                }
              }}
            >
              <CloseIcon width="24px" color="#000" />
            </IconButton>
          </ModalHeader>
          <ModalBody>
            {/* 有trx且处于redux transactions pending状态 */}
            {hash && userMenuVariable === 'pending' ? (
              <img src="/images/start/post.png" width={68} alt="" />
            ) : hash && receipt?.status === 1 ? (
              <img src="/images/home/success.png" width={68} alt="" />
            ) : (
              <img src="/images/home/fail.png" width={68} alt="" />
            )}
            <Flex>
              <Text fontSize="24px" fontWeight="600">
                {contTitle}
              </Text>
            </Flex>
            <Flex mb="30px" style={{ width: '100%' }}>
              {hash ? (
                <Flex alignItems="center" justifyContent="center" flexDirection="column" style={{ width: '100%' }}>
                  {receipt?.status !== 0 && (
                    <Text fontSize="16px" mt="5px" mb="5px" color="#85868A">
                      {pendingText}
                    </Text>
                  )}

                  {/* {userMenuVariable === 'pending' && ( */}
                  <Link
                    external
                    href={getBlockExploreLink(hash, 'transaction', chainId)}
                    color="#000"
                    style={{
                      background: 'transparent',
                      border: '1px solid #E8E8E8',
                      padding: '10px 10px',
                      borderRadius: '10px',
                      width: !isMobile ? '380px' : '90%',
                      textAlign: 'center',
                      display: 'inline-block',
                      marginTop: '20px',
                    }}
                  >
                    {t('View at Explorer')}
                    {/* {t('View on %site%', { site: getBlockExploreName(chainId) })} */}
                    {/* : {truncateHash(hash, 8, 0)} */}
                  </Link>
                  {/* )} */}
                </Flex>
              ) : (
                <Text
                  style={{
                    width: isMobile ? '100% ' : '418px',
                    maxHeight: '200px',
                    fontSize: '14px',
                    color: '#999',
                    wordBreak: 'break-all',
                    textAlign: 'center',
                    padding: '20px',
                    overflow: 'auto',
                  }}
                >
                  {errorMessage}
                </Text>
              )}
            </Flex>
          </ModalBody>
        </Box>
      )}
    </ModalContainer>
  )
}

export default ResultModal
