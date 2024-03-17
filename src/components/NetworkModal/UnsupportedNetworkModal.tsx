import { Button, Grid, Message, MessageText, Modal, Text } from '@inscription/uikit'
import { useLocalNetworkChain } from '../../hooks/useActiveChainId'
import { useTranslation } from '@inscription/localization'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import Image from 'next/image'
import useAuth from '../../hooks/useAuth'
import { useMenuItems } from '../../components/Menu/hooks/useMenuItems'
import { useRouter } from 'next/router'
import { getActiveMenuItem, getActiveSubMenuItem } from '../../components/Menu/utils'
import { useAccount, useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ChainId } from '../../../packages/swap-sdk/src/index'
import Dots from '../Loader/Dots'

// Where chain is not supported or page not supported
export function UnsupportedNetworkModal() {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chains } = useNetwork()
  const chainId = useLocalNetworkChain() || ChainId.EVM_TESTNET
  const { isConnected } = useAccount()
  const { logout } = useAuth()
  const { t } = useTranslation()
  const menuItems = useMenuItems()
  const { pathname } = useRouter()

  const title = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

    return activeSubMenuItem?.label || activeMenuItem?.label
  }, [menuItems, pathname])

  const supportedMainnetChains = useMemo(() => chains.filter((chain) => !chain.testnet), [chains])

  return (
    <Modal title={t('Please check your network.')} hideCloseButton headerBackground="gradients.cardHeader">
      <Grid style={{ gap: '16px', paddingTop: '50px' }} maxWidth="336px">
        {/* <Text>
          {t('Currently %feature% only supported in', { feature: typeof title === 'string' ? title : 'this page' })}{' '}
          {supportedMainnetChains?.map((c) => c.name).join(', ')}
        </Text> */}
        {/* <div style={{ textAlign: 'center', marginBottom: '5px' }}>
          <img
            width="134px"
            // height="15px"
            src="/images/start/error-network.png"
            alt={t('Please check your network.')}
          />
        </div> */}
        {/* <Message variant="warning">
          <MessageText>{t('Please switch your network to continue.')}</MessageText>
        </Message> */}
        {/* <Text textAlign="center" fontSize={14}>
          {t('Network error, please connect to EOS EVM network.')}
        </Text> */}
        {canSwitch && (
          <Button
            isLoading={isLoading}
            onClick={() => {
              if (supportedMainnetChains.map((c) => c.id).includes(chainId)) {
                switchNetworkAsync(chainId)
              } else {
                switchNetworkAsync(supportedMainnetChains[0].id)
              }
            }}
          >
            {isLoading ? <Dots>{t('Switch network in wallet.')}</Dots> : t('Switch network in wallet.')}
          </Button>
        )}
        {isConnected && (
          <Button variant="secondary" onClick={logout} style={{ color: '#000' }}>
            {t('Disconnect')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
