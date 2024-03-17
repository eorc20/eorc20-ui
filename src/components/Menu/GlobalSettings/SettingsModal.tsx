import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, InscriptionToggle, Toggle, Flex, Modal, InjectedModalProps, ThemeSwitcher, Box } from '@inscription/uikit'
import {
  useAudioModeManager,
  useExpertModeManager,
  // useSubgraphHealthIndicatorManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
  useZapModeManager,
} from '../../../state/user/hooks'
// import { ChainId } from '@inscription/sdk'
// import { SUPPORT_ZAP } from 'config/constants/supportChains'
// import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
// import { useActiveChainId } from 'hooks/useActiveChainId'
import { useTranslation } from '@inscription/localization'
import useTheme from '../../../hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'
import { SettingsMode } from './types'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  height: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: 90vh;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
  }
`

export const withCustomOnDismiss =
  (Component) =>
  ({
    onDismiss,
    customOnDismiss,
    mode,
    ...props
  }: {
    onDismiss?: () => void
    customOnDismiss: () => void
    mode: SettingsMode
  }) => {
    const handleDismiss = useCallback(() => {
      onDismiss?.()
      if (customOnDismiss) {
        customOnDismiss()
      }
    }, [customOnDismiss, onDismiss])

    return <Component {...props} mode={mode} onDismiss={handleDismiss} />
  }

const SettingsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss, mode }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()

  const { t } = useTranslation()
  const { isDark, setTheme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  return (
    <Modal title={t('public15')} onDismiss={onDismiss} bodyPadding="0 24px 24px 24px">
      <ScrollableContainer style={{ paddingTop: 0 }}>
        {/* {mode === SettingsMode.GLOBAL && ( */}
        <>
          <Flex pb="24px" flexDirection="column">
            {/* <Text bold textTransform="uppercase" fontSize="18px" color="secondary" mb="24px">
              {t('Global')}
            </Text>
            <Flex justifyContent="space-between" mb="24px">
              <Text>{t('Dark mode')}</Text>
              <ThemeSwitcher isDark={isDark} toggleTheme={() => setTheme(isDark ? 'light' : 'dark')} />
            </Flex> */}
            <GasSettings />
          </Flex>
        </>
        {/* )} */}
        {mode === SettingsMode.SWAP_LIQUIDITY && (
          <>
            <Flex pt="0" flexDirection="column">
              <TransactionSettings />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Flex alignItems="center">
                <Text fontSize="16px">{t('public18')}</Text>
                <QuestionHelper text={t('public22')} placement="top-start" ml="4px" />
              </Flex>
              <Toggle
                id="toggle-disable-multihop-button"
                checked={singleHopOnly}
                scale="sm"
                onChange={() => {
                  setSingleHopOnly(!singleHopOnly)
                }}
              />
            </Flex>
          </>
        )}
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
