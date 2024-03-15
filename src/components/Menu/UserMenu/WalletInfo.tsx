/* eslint-disable */
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from '@inscription/uikit'
import { ChainId } from '@inscription/sdk'
import { FetchStatus } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@inscription/localization'
import useAuth from 'hooks/useAuth'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ChainLogo } from 'components/Logo/ChainLogo'

import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { formatBigNumber } from 'utils/formatBalance'
import { useBalance } from 'wagmi'
import styled from 'styled-components'
import { copyText } from 'utils/copyText'
// import CopyAddress from './CopyAddress'
import { CopyButton } from '../../CopyButton'
import WalletTransactions from './WalletTransactions'
import { useEffect, useState } from 'react'
import chainUtils from 'service/chainUtils'
// import { getName } from 'service/service'

const IconRadius = styled.div`
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2fdd8a;
  margin-right: 10px;
`

const Wrap = styled.div``

const WrapStyle = styled.div`
  // border: 1px solid #e5e5e5;
  padding: 8px 0px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`

const BoxStyle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 10px;
`
interface WalletInfoProps {
  hasLowNativeBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowNativeBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account, chainId, connector, isConnected } = useActiveWeb3React()
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss?.()
    logout()
  }

  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null

  return (
    <Wrap>
      <WrapStyle>
        <Flex justifyContent="space-between" alignItems="center">
          {isConnected ? (
            <Flex alignItems="center" style={{ fontSize: '14px' }}>
              {t('Connected with')} {connector?.name}
            </Flex>
          ) : (
            <></>
          )}
        </Flex>

        <div style={{ marginTop: '60px', width: '100%', height: '30px', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text mr="10px" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {accountEllipsis}
          </Text>
          <CopyButton
            buttonColor="#000"
            iconColor={true}
            width="16px"
            text={account}
            tooltipMessage={t('Copied')}
            tooltipTop={185}
            tooltipRight={210}
          />
        </div>
        <Button onClick={handleLogout} width="100%" height="50px" style={{ fontSize: '15px', marginTop: '60px' }}>
          {t('Disconnect')}
        </Button>
      </WrapStyle>
      {/* <WalletTransactions /> */}
    </Wrap>
  )
}

export default WalletInfo
