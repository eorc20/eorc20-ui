import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalTitle,
  useMatchBreakpoints,
  Text,
} from '@inscription/uikit'
import { useTranslation, languageList } from '@inscription/localization'
import styled from 'styled-components'

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  display: flex;
  padding: 12px 24px;
`

const SelectBtn = styled.div`
  display: flex;
  padding: 19px;
  font-size: 20px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &.active {
    border-color: #000;
  }
`

const LanguageModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { currentLanguage, setLanguage, t } = useTranslation()

  const { isMobile } = useMatchBreakpoints()
  const handleSetLanguage = (lang) => {
    setLanguage(lang)
    onDismiss()
  }

  return (
    <ModalContainer title={t('public182')} $minWidth={isMobile ? '100%' : '418px'}>
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('public182')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#000" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="0 24px 24px 24px" width="100%">
        {languageList.map((lang) => (
          <SelectBtn
            className={lang.code === currentLanguage?.code ? 'active' : undefined}
            key={lang.code}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => handleSetLanguage(lang)}
          >
            <Text fontSize={20} ml={12}>
              {lang.language}
            </Text>
          </SelectBtn>
        ))}
      </ModalBody>
    </ModalContainer>
  )
}

export default LanguageModal
