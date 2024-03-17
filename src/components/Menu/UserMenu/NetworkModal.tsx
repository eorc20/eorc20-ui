/* eslint-disable */
import { parseUnits } from '@ethersproject/units'
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
  Flex,
  useModal,
} from '@inscription/uikit'
// import { useWeb3React } from '@inscription/wagmi'
// import { useState, useMemo } from 'react'
import { useTranslation } from '@inscription/localization'
import styled from 'styled-components'
// import { ChainLogo } from '../../../components/Logo/ChainLogo'
// import { chains, isChainSupported } from '../../../utils/wagmi'
// import { useActiveChainId } from '../../../hooks/useActiveChainId'
import { useSwitchNetwork } from '../../../hooks/useSwitchNetwork'
// import { useNetworkConnectorUpdater } from '../../../hooks/useActiveWeb3React'
// import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useToast from '../../../hooks/useToast'
import { useRouter, NextRouter } from 'next/router'
// eslint-disable-next-line import/no-cycle
import RpcModal from './RpcModal'

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
const BottomDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eeeeee;
  width: 100%;
  height: 120px;
  padding: 20px 24px;
`

const BottomBtn = styled.div`
  display: inline-block;
  padding: 6px 20px;
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
`
const getHashFromRouter = (router: NextRouter) => {
  return router.asPath.match(/#([a-z0-9]+)/gi)
}
const NetworkModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  // const router = useRouter()
  // const { pendingChainId, isLoading, switchNetworkAsync } = useSwitchNetwork()
  // const { toastError } = useToast()

  const [onPresentRpcModal] = useModal(<RpcModal />)

  const { isMobile } = useMatchBreakpoints()


  const handleCheckRpc = () => {
    onPresentRpcModal()
  }

  return (
    <ModalContainer title={t('public183')} $minWidth={isMobile ? '100%' : '418px'}>
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('public183')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#000" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="0 24px 24px 24px" width="100%">
        <BottomDiv>
          <Flex>
            <Text color="#999" fontSize="12px">
              {t('public221')}
            </Text>
          </Flex>
          <BottomBtn onClick={() => handleCheckRpc()}>{t('public222')}</BottomBtn>
        </BottomDiv>
      </ModalBody>
    </ModalContainer>
  )
}

export default NetworkModal
