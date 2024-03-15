import { Token } from '@inscription/sdk'
import { Modal, Box, InjectedModalProps } from '@inscription/uikit'
// import ImportToken from 'components/SearchModal/ImportToken'
import { useTranslation } from '@inscription/localization'

interface Props extends InjectedModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<React.PropsWithChildren<Props>> = ({ tokens, onDismiss, onCancel }) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={t('public32')}
      onDismiss={() => {
        onDismiss?.()
        onCancel()
      }}
    >
      <Box maxWidth="380px">
        *
        {/* <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} /> */}
      </Box>
    </Modal>
  )
}

export default ImportTokenWarningModal
