import { ReactElement, useCallback, useEffect, useState } from 'react'
import { ChainId, Currency, Token } from '../../../packages/swap-sdk/src/index'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  ArrowUpIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
  ModalProps,
} from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { WrappedTokenInfo } from '@inscription/tokens'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBlockExploreLink, getBlockExploreName } from '../../utils'
import AddToWalletButton, { AddToWalletTextOptions } from '../AddToWallet/AddToWalletButton'

const Wrapper = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 420px !important;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0px 0 24px;
`

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        {/* <Spinner /> */}
        <img src="/images/start/loading.gif" width={200} alt="" />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">{t('Waiting for confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            {pendingText}
          </Text>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          {/* <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" /> */}
          {hash ? (
            <img width="100px" src="/images/home/success.png" alt="" />
          ) : (
            <img width="100px" src="/images/home/fail.png" alt="" />
          )}
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          {hash ? <Text fontSize="20px">{t('Transaction submitted')}</Text> : <Text fontSize="20px">{t('This transaction will fail')}</Text>}
          {chainId && hash && (
            <Link external small href={getBlockExploreLink(hash, 'transaction', chainId)}>
              {t('View on %site%', {
                site: getBlockExploreName(chainId),
              })}
            </Link>
          )}
          {currencyToAdd && (
            <AddToWalletButton
              variant="tertiary"
              mt="12px"
              width="fit-content"
              marginTextBetweenLogo="6px"
              textOptions={AddToWalletTextOptions.TEXT_WITH_ASSET}
              tokenAddress={token.address}
              tokenSymbol={currencyToAdd.symbol}
              tokenDecimals={token.decimals}
              tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
            />
          )}
          <Button onClick={onDismiss} mt="20px">
            {t('Close')}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string
  onDismiss?: () => void
}) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <ErrorIcon color="failure" width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word' }}>
          {message}
        </Text>
      </AutoColumn>

      {/* {onDismiss ? (
        <Flex justifyContent="center" pt="24px">
          <Button onClick={onDismiss}>{t('Waiting for confirmation')}</Button>
        </Flex>
      ) : null} */}
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

enum ModalType {
  PEDDING,
  SUBMITTED,
  COMPLETE,
}

const TransactionConfirmationModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmationModalProps & ModalProps>
> = ({ title, onDismiss, customOnDismiss, attemptingTxn, hash, pendingText, content, currencyToAdd, ...props }) => {
  const { chainId } = useActiveWeb3React()

  const [modalType, setModalType] = useState<ModalType>(ModalType.PEDDING)

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  useEffect(() => {
    if (attemptingTxn) {
      setModalType(ModalType.PEDDING)
    } else {
      setModalType(ModalType.SUBMITTED)
    }
  }, [attemptingTxn, hash, handleDismiss])

  if (!chainId) return null

  return (
    <Modal title={!hash ? title : ''} {...props} onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={handleDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
