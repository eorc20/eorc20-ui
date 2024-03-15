import {
  BlockIcon,
  CheckmarkCircleIcon,
  useMatchBreakpoints,
  Flex,
  Link,
  OpenNewIcon,
  RefreshIcon,
} from '@inscription/uikit'
import styled from 'styled-components'
import { useTranslation } from '@inscription/localization'
import { TransactionDetails } from 'state/transactions/reducer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBlockExploreLink } from 'utils'

interface TransactionRowProps {
  txn: TransactionDetails
}

const TxnIcon = styled(Flex)`
  align-items: center;
  width: 24px;
  padding-top: 3px;
`

const Summary = styled.div`
  flex: 1;
  padding: 0 8px;
  font-weight: 400;
`

const TxnLink = styled(Link)<{ isMobile?: boolean }>`
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  font-size: ${({ isMobile }) => (isMobile ? '13px' : '16px')};

  &:hover {
    text-decoration: none;
  }
`

const renderIcon = (txn: TransactionDetails, isMobile) => {
  if (!txn.receipt) {
    // return <RefreshIcon spin width="24px" />
    return <img src="/images/start/loadingnew.png" width={isMobile ? 18 : 20} alt="" />
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? (
    // <CheckmarkCircleIcon color="success" width="24px" />
    <img src="/images/home/success.png" width={isMobile ? 18 : 20} alt="" />
  ) : (
    // <BlockIcon color="failure" width="24px" />
    <img src="/images/home/fail.png" width={isMobile ? 18 : 20} alt="" />
  )
}
const TransactionRow: React.FC<React.PropsWithChildren<TransactionRowProps>> = ({ txn }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  if (!txn) {
    return null
  }

  return (
    <TxnLink href={getBlockExploreLink(txn.hash, 'transaction', chainId)} external isMobile={isMobile}>
      <TxnIcon>{renderIcon(txn, isMobile)}</TxnIcon>
      <Summary>
        {txn.translatableSummary ? (
          <div>
            {/* 投票--变量在前，语言包在后 */}
            {txn.type === 'Vote' ? (
              <div>
                <span>{txn.translatableSummary.data.symbol}</span>
                <span> {t(txn.translatableSummary.text)}</span>
              </div>
            ) : txn.type === 'claim' ? (
              // 领取--语言包在前，后面是一个币种列表，Array
              <div>
                <span>{t(txn.translatableSummary.text)} </span>
                {txn.translatableSummary.data.currentItem.yieldList.map((item, index, array) => (
                  <span>
                    {item.symbol}
                    {index !== array.length - 1 ? '、' : ''}
                  </span>
                ))}
              </div>
            ) : txn.type === 'swap' ? ( // 兑换 || eos-weos
              t(txn.translatableSummary.text, txn.translatableSummary.data)
            ) : txn.type === 'wrap' ? (
              t(txn.translatableSummary.text, txn.translatableSummary.data)
            ) : txn.type === 'add-liquidity' || txn.type === 'remove-liquidity' ? ( // 添加流动性
              t(txn.translatableSummary.text, txn.translatableSummary.data)
            ) : (
              // 通常--语言包在前，变量在后
              <div>
                <span>{t(txn.translatableSummary.text)}</span>
                <span> {txn.translatableSummary.data.symbol}</span>
              </div>
            )}
          </div>
        ) : (
          txn.summary ?? txn.hash
        )}
      </Summary>
      <TxnIcon>
        {/* <OpenNewIcon width="24px" color="#666" /> */}
        <img src="/images/start/icon4.png" width={isMobile ? 16 : 16} alt="" />
      </TxnIcon>
    </TxnLink>
  )
}

export default TransactionRow
