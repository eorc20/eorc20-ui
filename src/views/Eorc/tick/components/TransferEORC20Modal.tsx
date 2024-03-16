/* eslint-disable */
import { parseUnits } from '@ethersproject/units'
import {
  CloseIcon,
  Heading,
  IconButton,
  ModalBody,
  ModalContainer,
  ModalTitle,
  useMatchBreakpoints,
  Text,
  useModal,
} from '@inscription/uikit'
import { useWeb3React } from '@inscription/wagmi'
import { useSigner } from 'wagmi'
import { useState, useMemo, useEffect } from 'react'
import ResultModal from 'components/ResultModal'
import { useGasPrice } from 'state/user/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import chainUtils from 'service/chainUtils'
import { useTranslation } from '@inscription/localization'
import { Contract } from '@ethersproject/contracts'
import { useRouter } from 'next/router'
import { Currency, CurrencyAmount, JSBI } from '@inscription/sdk'
import { ChainId, Token } from '@inscription/sdk'
import {
  formatBigNumberToFixed,
  formatFixedNumber,
  truncateZero,
  truncate,
  formatEffectiveNumber2,
  getRes,
  formatEffectiveNumberSix,
  getAdd,
  getSub,
} from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import styles from '../style/transfereorc.module.scss'
import { formatToThousands } from 'utils/formatInfoNumbers'
import { getTokens } from 'service/service'
import { ethers, utils } from 'ethers'
// import { Span } from '@sentry/nextjs'
// import { AnyAction } from '@reduxjs/toolkit'

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

const ManageLPModal: React.FC<React.PropsWithChildren<any>> = ({ onDismiss, item, handleGoTransfer }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const router = useRouter()
  const { chainId } = useActiveWeb3React()
  const { account } = useWeb3React()
  // 0x487cEC520dB273f285f26acf721A24683c1192a1
  // 0xb1d04FB98A9B355a6ea278AacAE1ba7E1E009B13 not Play
  const [searchAddress, setSearchAddress] = useState('')
  const [searchAmount, setSearchAmount] = useState('')
  const [bal, setBal] = useState<any>(0) // bal

   // 先获取用户余额
  useEffect(() => {
    const { baseURL, chainid } = chainUtils(chainId)
    const fetch = async () => {
      const params = {
        address: account,
        // address: '0x64100aed32814e60604611fd4d860edf81234567',
        // address: '0x5EB954fB68159e0b7950936C6e1947615b75C895',
      }
      const { data } = await getTokens(params, {baseURL, chainid})
        if (data.length > 0) {
          const obj = data.find(a => a.tick === item?.tick)
          // console.log('obj', item?.tick, obj)
          setBal(obj.amount)
        } else {
          setBal(0)
        }
      // }
    }
    if(account){
      fetch()
    }
  }, [account])

  const handleSearchAddress = (e) => {
    // console.log(ethers.utils.isAddress(e.target.value.trim()), 'aaa')
    setSearchAddress(e.target.value.trim())
  }

  const handleSearchAmount = (e) => {
    const value = e.target.value;
    // const re = /^[0-9\b]+$/;
    const re = /^\d+$/;
    // console.log(value, 'value')
    if (value === '' || re.test(value)) {
      setSearchAmount(value);
    }
  }
  

  const handleGo = async () => {
    onDismiss()
    handleGoTransfer(searchAddress, searchAmount)
  }


  const handleMax = async (rate) => {
    setSearchAmount(Number(bal).toString())
  }
  return (
    <ModalContainer title={t('')} $minWidth={isMobile ? '100%' : '418px'} $minHeight={'auto'}>
      <ModalHeader>
        <ModalTitle>
        {/* {item?.tick} */}
          <Heading>{t('Transfer')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#000" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="0 24px 24px 24px" width="100%">
        <div className={`${styles.main}`}>
            <div className={`flex flexb`}>
            {/* {t('Transfer')} */}
              <div className={`${styles.label}`}></div>
              <div className={`flex flexc`}>
                <div style={{fontSize: '14px'}}>{t('Bal.')}:&nbsp;</div>
                <div className={`${styles.bal} pointer`} onClick={() => handleMax(100)}>
                  {formatToThousands(bal)} {item?.tick}
                </div>
              </div>
            </div>
          <div className={`${styles.userIn}`}>
            <input
              className={styles.input}
              type="text"
              value={searchAddress}
              onChange={handleSearchAddress}
              placeholder={t('Address')}
            />
            <input
              className={styles.input}
              type="text"
              pattern="\d*"
              value={searchAmount}
              onChange={handleSearchAmount}
              placeholder={t('Amount')}
            />
          </div>
        </div>

        <div style={{padding: '0 15px'}}>
          {/* <div className={`${styles.lped} flex flexb`}>
            <div className={`${styles.label}`}>{t('Total Transfer Addresses')}</div>
            <div className={`${styles.price}`}>
              <span>1/1000</span>
            </div>
          </div> */}

          {searchAddress && ethers.utils.isAddress(searchAddress) && searchAmount && Number(searchAmount) > 0 && Number(searchAmount) <= Number(bal) ? (
            <div className={`${styles.btn} flex flexc pointer`}
              onClick={() => {
                // onDismiss()
                handleGo()
              }}
            >
              <span>{t('Transfer')}</span>
            </div>

          ) : searchAmount && Number(searchAmount) > Number(bal) ? (
            <div className={`${styles.btn} ${styles.btn_disabled} flex flexc`}>
              <span>{t('Insufficient Balance')}</span>
            </div>
          ) : searchAddress.toLowerCase() == account.toLowerCase() ? (
            <div className={`${styles.btn} ${styles.btn_disabled} flex flexc`}>
              <span>{t('Cannot be your own account')}</span>
            </div>
          ) : !searchAddress ? (
            <div className={`${styles.btn} ${styles.btn_disabled} flex flexc`}>
              <span>{t('Enter the Address')}</span>
            </div>
          ) : ethers.utils.isAddress(searchAddress) == false ? (
            <div className={`${styles.btn} ${styles.btn_disabled} flex flexc`}>
              <span>{t('Enter the correct account number')}</span>
            </div>
          ) : (
            <div className={`${styles.btn} ${styles.btn_disabled} flex flexc`}>
              <span>{t('Enter the Amount')}</span>
            </div>
          )}
        </div>

      </ModalBody>
    </ModalContainer>
  )
}

export default ManageLPModal
