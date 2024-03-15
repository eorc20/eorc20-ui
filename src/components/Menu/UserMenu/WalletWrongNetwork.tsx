import styled from 'styled-components'
import { useTranslation } from '@inscription/localization'
import { Button, Text, Link, HelpIcon } from '@inscription/uikit'
import { ChainId } from '@inscription/sdk'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    text-decoration: initial;
  }
`

interface WalletWrongNetworkProps {
  onDismiss: () => void
}

const WalletWrongNetwork: React.FC<React.PropsWithChildren<WalletWrongNetworkProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { switchNetworkAsync, canSwitch } = useSwitchNetwork()

  const handleSwitchNetwork = async (): Promise<void> => {
    await switchNetworkAsync(ChainId.EVM_NET)
    onDismiss?.()
  }

  return (
    <>
      <Text mt='50px' mb="24px">{t('You are connected to the wrong network.')}</Text>
      {canSwitch && (
        <Button onClick={handleSwitchNetwork} mb="24px">
          {t('Switch Network')}
        </Button>
      )}
      {/* <StyledLink href="https://docs.public.pro/get-started/connection-guide" external>
        <Button width="100%" variant="secondary">
          {t('Learn How')}
          <HelpIcon color="primary" ml="6px" />
        </Button>
      </StyledLink> */}
    </>
  )
}

export default WalletWrongNetwork
