import { parseUnits } from '@ethersproject/units'
import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
  useMatchBreakpoints,
} from '@inscription/uikit'
import { useWeb3React } from '@inscription/wagmi'
import { useState } from 'react'
import { useTranslation } from '@inscription/localization'
import styled from 'styled-components'
import { useBalance } from 'wagmi'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import WalletWrongNetwork from './WalletWrongNetwork'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
  WRONG_NETWORK,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_EOS_BALANCE = parseUnits('2', 'gwei')

const ModalHeader = styled(UIKitModalHeader)`
  /* background: ${({ theme }) => theme.colors.gradients.bubblegum}; */
`

const Tabs = styled.div`
  /* background-color: ${({ theme }) => theme.colors.dropdown}; */
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  padding: 16px 24px;
`

const WalletModal: React.FC<React.PropsWithChildren<WalletModalProps>> = ({
  initialView = WalletView.WALLET_INFO,
  onDismiss,
}) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { data, isFetched } = useBalance({ addressOrName: account })
  const hasLowNativeBalance = isFetched && data && data.value.lte(LOW_EOS_BALANCE)
  const { isMobile } = useMatchBreakpoints()

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  // const TabsComponent: React.FC<React.PropsWithChildren> = () => (
  //   <Tabs>
  //     <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
  //       <ButtonMenuItem>{t('Wallet')}</ButtonMenuItem>
  //       <ButtonMenuItem>{t('Transactions')}</ButtonMenuItem>
  //     </ButtonMenu>
  //   </Tabs>
  // )

  return (
    <ModalContainer title={t('Welcome!')} $minWidth={isMobile ? '100%' : '418px'}>
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Account')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#000" />
        </IconButton>
      </ModalHeader>
      {/* {view !== WalletView.WRONG_NETWORK && <TabsComponent />} */}
      <ModalBody p="0 24px 24px 24px" width="100%">
        {view === WalletView.WALLET_INFO && (
          <WalletInfo hasLowNativeBalance={hasLowNativeBalance} onDismiss={onDismiss} />
        )}
        {/* {view === WalletView.TRANSACTIONS && <WalletTransactions />} */}
        {view === WalletView.WRONG_NETWORK && <WalletWrongNetwork onDismiss={onDismiss} />}
      </ModalBody>
    </ModalContainer>
  )
}

export default WalletModal
