import { Button, Modal, Text, Grid, Box } from '@inscription/uikit'
import { ChainId } from '../../../packages/swap-sdk/src/index'
import Image from 'next/future/image'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { chains } from '../../utils/wagmi'
import { useTranslation } from '@inscription/localization'
import { useMemo } from 'react'
import { useHistory } from '../../contexts/HistoryContext'
import NextLink from 'next/link'
import { useMenuItems } from '../../components/Menu/hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from '../../components/Menu/utils'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'

export function PageNetworkSupportModal() {
  const { t } = useTranslation()
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chainId, isConnected } = useActiveWeb3React()
  const { logout } = useAuth()

  const foundChain = useMemo(() => chains.find((c) => c.id === chainId), [chainId])
  const historyManager = useHistory()

  const lastValidPath = historyManager?.history?.find((h) => ['/swap', 'liquidity', '/'].includes(h))

  const menuItems = useMenuItems()
  const { pathname, push } = useRouter()

  const { title, image } = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

    return {
      title: activeSubMenuItem?.disabled ? activeSubMenuItem?.label : activeMenuItem?.label,
      image: activeSubMenuItem?.image || activeMenuItem?.image,
    }
  }, [menuItems, pathname])

  return (
    <Modal title={title || t('Please check your network.')} hideCloseButton headerBackground="gradients.cardHeader">
      <Grid style={{ gap: '16px', paddingTop: '100px' }} maxWidth="360px">
        <Text bold>{t('Network error, please connect to EOS EVM network.')}</Text>

        {image && (
          <Box mx="auto" my="8px" position="relative" width="100%" minHeight="250px">
            <Image src={image} alt="feature" fill style={{ objectFit: 'contain' }} unoptimized />
          </Box>
        )}
        {/* <Text small>
          {t(
            'Our Pools, Limit, Trading Competition, Prediction, Lottery and NFTs features are currently available only on EOS Chain! Come over and join the community in the fun!',
          )}
        </Text> */}
        {canSwitch && (
          <Button
            variant={foundChain && lastValidPath ? 'secondary' : 'primary'}
            isLoading={isLoading}
            onClick={() => switchNetworkAsync(ChainId.EVM_NET)}
          >
            {t('Switch to %chain%', { chain: 'EOS EVM' })}
          </Button>
        )}
        {isConnected && (
          <Button
            variant="secondary"
            style={{ color: '#e7ae08' }}
            onClick={() =>
              logout().then(() => {
                push('/')
              })
            }
          >
            {t('Disconnect')}
          </Button>
        )}
        {foundChain && lastValidPath && (
          <NextLink href={lastValidPath} passHref>
            <Button as="a">{t('Stay on %chain%', { chain: foundChain.name })}</Button>
          </NextLink>
        )}
      </Grid>
    </Modal>
  )
}
