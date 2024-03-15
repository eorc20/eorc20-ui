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
  ModalBackButton,
  Flex,
  useModal,
} from '@inscription/uikit'
import { useWeb3React } from '@inscription/wagmi'
import { useState, useMemo } from 'react'
import { useTranslation } from '@inscription/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'
import { useRouter, NextRouter } from 'next/router'
import { EVM_PROD_NODE } from 'utils/providers'
// eslint-disable-next-line import/no-cycle
import NetworkModal from './NetworkModal'

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
  height: 130px;
  padding: 20px 24px;
`

const BottomBtn = styled.div`
  display: inline-block;
  padding: 6px 16px;
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
`
const RpcModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  // const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const router = useRouter()
  const { chainId } = useActiveWeb3React()
  // console.log('chainId', chainId)
  const parsedQueryChainId = chainId || Number(router.query.chainId)
  // console.log('parsedQueryChainId', parsedQueryChainId)
  const rpcUrl = localStorage.getItem('rpcUrl') || EVM_PROD_NODE
  const { toastError } = useToast()

  const { isMobile } = useMatchBreakpoints()
  const [onPresentNetworkModal] = useModal(<NetworkModal />)

  const handleClick = async (item) => {
    if (item.url !== rpcUrl) {
      localStorage.setItem('rpcUrl', item.url)
      window.location.reload()
    }
  }
  let rpcLists = []
  let netWorkName = 'EOS NetWork'

  if (parsedQueryChainId === 17777) {
    rpcLists = [
      {
        id: 1,
        url: 'https://api.evm.eosnetwork.com',
      },
      {
        id: 2,
        url: 'https://api-evm.public.pro',
      },
      // {
      //   id: 3,
      //   url: 'https://api-evm.defibox.io',
      // },
      // {
      //   id: 4,
      //   url: 'http://54.179.244.159:81',
      // },
    ]
  } else if (parsedQueryChainId === 15557) {
    netWorkName = 'EOS test NetWork'
    rpcLists = [
      {
        id: 1,
        url: 'https://api.testnet.evm.eosnetwork.com',
      },
    ]
  } else {
    rpcLists = []
  }

  return (
    <ModalContainer title={t('public223')} $minWidth={isMobile ? '100%' : '418px'}>
      <ModalHeader>
        {/* <ModalBackButton onBack={() => onPresentNetworkModal()} /> */}
        <ModalTitle>
          {/* <Heading>{t('public223')}</Heading> */}
          <Heading>{t('public485')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#000" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="0 24px 24px 24px" width="100%">
        {/* <Text fontSize="13px" mb="16px">
          {t('You are replacing the RPC URL for %network%', { network: netWorkName })}
        </Text> */}
        {rpcLists.map((item) => (
          <SelectBtn
            className={item.url === rpcUrl ? 'active' : undefined}
            key={item.id}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => handleClick(item)}
          >
            <Text fontSize={18} ml={0}>
              {item.url}
            </Text>
          </SelectBtn>
        ))}
      </ModalBody>
    </ModalContainer>
  )
}

export default RpcModal
