/* eslint-disable */
import { useTranslation } from '@inscription/localization'
// import { ChainId } from '@inscription/sdk'
import {
  Box,
  // Flex,
  // LogoutIcon,
  // RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  // UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@inscription/uikit'
import ConnectWalletButton from '../../../components/ConnectWalletButton'
import Trans from '../../../components/Trans'
import { useActiveChainId } from '../../../hooks/useActiveChainId'
// import useAuth from 'hooks/useAuth'
// import NextLink from 'next/link'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
// import { getName } from 'service/service'
// import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from '../../../state/transactions/hooks'
// import { useAccount } from 'wagmi'
// import chainUtils from 'service/chainUtils'
// import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
// import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  // const { address: account } = useAccount()
  const { isWrongNetwork } = useActiveChainId()
  // const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  // const { profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  // const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  // const hasProfile = isInitialized && !!profile
  const avatarSrc = null
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }
  const { account, chainId } = useActiveWeb3React()
  const [accountName, setAccountName] = useState('')
  // getName
  // useEffect(() => {
  //   const { baseURL, chainid } = chainUtils(chainId)
  //   const fetch = async () => {
  //     const params = {
  //       address: account,
  //     }
  //     const { code, data } = await getName(params, { baseURL, chainid })
  //     if (!code) {
  //       if (data) {
  //         setAccountName(data)
  //       }
  //     }
  //   }
  //   fetch()
  // }, [account, chainId])
  // const UserMenuItems = () => {
  //   return (
  ;<>
    {/* <WalletUserMenuItem isWrongNetwork={isWrongNetwork} onPresentWalletModal={onClickWalletMenu} /> */}
    {/* <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentTransactionModal}>
          {t('public7')}
          {hasPendingTransactions && <RefreshIcon spin />}
        </UserMenuItem>
        <UserMenuDivider /> */}
    {/* <NextLink href={`/profile/${account?.toLowerCase()}`} passHref>
          <UserMenuItem as="a" disabled={isWrongNetwork || chainId !== ChainId.EVM}>
            {t('Your NFTs')}
          </UserMenuItem>
        </NextLink> */}
    {/* <ProfileUserMenuItem
          isLoading={isLoading}
          hasProfile={hasProfile}
          disabled={isWrongNetwork || chainId !== ChainId.EVM}
        /> */}
    {/* <UserMenuDivider />
        <UserMenuItem as="button" onClick={logout}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Disconnect')}
            <LogoutIcon />
          </Flex>
        </UserMenuItem> */}
  </>
  //   )
  // }

  if (account) {
    return (
      <UIKitUserMenu
        account={account}
        accountName={accountName}
        avatarSrc={avatarSrc}
        text={userMenuText}
        variant={userMenuVariable}
        disabled
        onPresentWalletModal={onClickWalletMenu}
      >
        {({ isOpen }) => (isOpen ? null : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('public180')} variant="danger">
        {({ isOpen }) => (isOpen ? <UserMenuItem as="button" onClick={onClickWalletMenu} /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButton scale="sm" height="30px" style={{marginLeft: '22px'}}>
      <Box display={['none', , , 'block']}>
        <Trans>Connect Wallet</Trans>
      </Box>
      <Box display={['block', , , 'none']}>
        <Trans>Connect</Trans>
      </Box>
    </ConnectWalletButton>
  )
}

export default UserMenu
