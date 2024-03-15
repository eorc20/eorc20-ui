import { useTranslation } from '@inscription/localization'
import { ChainId } from '@inscription/sdk'
import { ArrowForwardIcon, Button, Grid, Message, MessageText, Modal, Text } from '@inscription/uikit'
import { FlexGap } from 'components/Layout/Flex'
// import { ChainLogo } from 'components/Logo/ChainLogo'
import useAuth from 'hooks/useAuth'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import Image from 'next/future/image'
import { Chain, useAccount, useNetwork } from 'wagmi'
import Dots from '../Loader/Dots'

// Where page network is not equal to wallet network
export function WrongNetworkModal({ currentChain, onDismiss }: { currentChain: Chain; onDismiss: () => void }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { logout } = useAuth()
  const { isConnected } = useAccount()
  const [, setSessionChainId] = useSessionChainId()
  const chainId = currentChain.id || ChainId.EVM_NET
  const { t } = useTranslation()

  const switchText = t('Switch to %network%', { network: currentChain.name })

  return (
    <Modal title={t('You are connected to the wrong network')} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      <Grid style={{ gap: '16px', margin: '0' }} maxWidth="336px">
        {/* <Text>{t('This page is located for %network%.', { network: currentChain.name })}</Text> */}
        <Text>
          {t('You are under %network% now, please switch the network to continue.', { network: chain?.name ?? '' })}
        </Text>
        {/* <div style={{ textAlign: 'center' }}>
          <img
            width="134px"
            src="/images/start/error-network.png"
            alt={t('Please check your network')}
          />
        </div> */}
        {/* <Message variant="warning" icon={false} p="8px 12px">
          <MessageText>
            <FlexGap gap="12px" alignItems="center">
              <span>{t('switch network to continue')}</span>
            </FlexGap>
          </MessageText>
        </Message> */}
        <div style={{margin: '20px 0'}} />
        {canSwitch && (
          <Button isLoading={isLoading} onClick={() => switchNetworkAsync(chainId)}>
            {isLoading ? <Dots>{switchText}</Dots> : switchText}
          </Button>
        )}
        {isConnected && (
          <Button
            onClick={() =>
              logout().then(() => {
                setSessionChainId(chainId)
              })
            }
            variant="secondary"
            style={{ color: '#000' }}
          >
            {t('Disconnect')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
