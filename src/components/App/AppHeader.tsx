import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, Button } from '@inscription/uikit'
import { useExpertModeManager, useUserSlippageTolerance } from '../../state/user/hooks'
import GlobalSettings from '../../components/Menu/GlobalSettings'
import Link from 'next/link'
import { useTranslation } from '@inscription/localization'
// import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'
import { SettingsMode } from '../Menu/GlobalSettings/types'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string | (() => void)
  noConfig?: boolean
  type?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`

const AppHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  helper,
  backTo,
  noConfig = false,
  type = false,
}) => {
  const [expertMode] = useExpertModeManager()
  const { t } = useTranslation()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" width="100%" style={{ gap: '16px' }}>
        {backTo &&
          (typeof backTo === 'string' ? (
            <Link passHref href={backTo}>
              <IconButton as="a" scale="sm">
                <ArrowBackIcon width="32px" />
              </IconButton>
            </Link>
          ) : (
            <IconButton scale="sm" variant="text" onClick={backTo}>
              <ArrowBackIcon width="32px" />
            </IconButton>
          ))}
        <Flex flexDirection="column" width="100%">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading as="h2">{title}</Heading>
            {!noConfig && (
              <Flex alignItems="center">
                {/* {!type && (
                  <Flex alignItems="center">
                    <Text fontSize="14px">
                      {t('public16')}: {allowedSlippage / 100}%
                    </Text>
                  </Flex>
                )} */}
                {/* {!type && (
                  <NotificationDot show={expertMode}>
                    <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
                  </NotificationDot>
                )} */}
                {/* <Transactions /> */}
                {type && (
                  <Link href="/find" passHref>
                    <Button id="import-pool-link" scale="sm" as="a" style={{ background: 'transparent' }}>
                      {t('public110')}
                    </Button>
                  </Link>
                )}
              </Flex>
            )}
          </Flex>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </AppHeaderContainer>
  )
}

export default AppHeader
