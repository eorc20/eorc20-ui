import { Flex, UserMenuItem, WarningIcon } from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
// import { useGetEosBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import { LOW_EOS_BALANCE } from './WalletModal'

interface WalletUserMenuItemProps {
  isWrongNetwork: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<React.PropsWithChildren<WalletUserMenuItemProps>> = ({
  isWrongNetwork,
  onPresentWalletModal,
}) => {
  const { t } = useTranslation()
  // const { balance, fetchStatus } = useGetEosBalance()
  // const hasLowEosBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_EOS_BALANCE)

  return (
    <UserMenuItem as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        {t('Wallet')}
        {/* {hasLowEosBalance && !isWrongNetwork && <WarningIcon color="warning" width="24px" />} */}
        {!isWrongNetwork && <WarningIcon color="warning" width="24px" />}
        {isWrongNetwork && <WarningIcon color="failure" width="24px" />}
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
