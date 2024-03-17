/* eslint-disable */
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
// import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import { useWallet } from '../../../hooks/useWallet'
import formatTimestamp from '../../../utils/formatTimestamp'
import { useMatchBreakpoints, useModal } from '@inscription/uikit'
import { useRouter } from 'next/router'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useTranslation } from '@inscription/localization'
import ResultModal from '../../../components/ResultModal'
import { truncateZero } from '../../../utils/formatBalance'
import { formatToThousands } from '../../../utils/formatInfoNumbers'
import { Flex, Text, Skeleton } from '@inscription/uikit'
import { getSupply, getHolders } from '../../../service/service'
import chainUtils from '../../../service/chainUtils'
import { useSendTransaction, usePrepareSendTransaction, useFeeData } from 'wagmi'
import { Pagination } from 'antd';
import { ethers, utils } from 'ethers'
// import { Name } from '@wharfkit/session'
import Page from '../../Page'
import styles from './style/index.module.scss'

import TransferEORC20Modal from './components/TransferEORC20Modal'

const TickDetails: React.FC<React.PropsWithChildren<{ tick: string }>> = ({ tick: routeTick }) => {
    const router = useRouter()
    const { t, currentLanguage: { code: langCode } } = useTranslation()
    // const handleActive = useActiveHandle()
    const { onPresentConnectModal } = useWallet()
    const { isMobile } = useMatchBreakpoints()
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [listData, setListData] = useState<any>([])
    const [currentData, setCurrentData] = useState<any>([])
    const [supply, setSupply] = useState<any>({})
    const { account, chainId } = useActiveWeb3React()
    const [userOutAddress, setUserOutAddress] = useState('')
    const [userOutAmount, setUserOutAmount] = useState('')
    const [pendingText, setPendingText] = useState('')
    const name = routeTick


    const ResponsiveGrid = styled.div<{ tableHead?: boolean }>`
    display: grid;
    grid-gap: 1em;
    align-items: center;
    // grid-template-columns: repeat(6, 2fr);
    grid-template-columns: 100%;
    background: ${({ tableHead }) => (tableHead ? '#F2F2F2' : '#fff')};
    margin-top: ${({ tableHead }) => (tableHead ? '10px' : '10px')};
    border-radius: ${({ tableHead }) => (tableHead ? '8px' : '0px')};
    text-align: center;
    grid-template-columns::nth-child(1) {
      border: 1px solid red;
    }
    // // padding: 0 24px;
    @media screen and (max-width: 1200px) {
      padding: 0 20px;
      // // grid-template-columns: 200px 1.5fr repeat(3, 2fr);
      // grid-template-columns: 35% 30% 31%;
      // & :nth-child(4),
      // & :nth-child(5),
      // & :nth-child(6) {
      //   display: none;
      // }
    }
    @media screen and (max-width: 500px) {
      padding: 0 20px;
      // grid-template-columns: 35% 30% 25% !important;
      // & :nth-child(4),
      // & :nth-child(5),
      // & :nth-child(6) {
      //   display: none;
      // }
    }
  `
    const LoadingRow: React.FC<React.PropsWithChildren> = () => (
        <ResponsiveGrid>
            <Skeleton />
        </ResponsiveGrid>
    )

    const TableLoader: React.FC<React.PropsWithChildren> = () => (
        <>
            <LoadingRow />
            <LoadingRow />
            <LoadingRow />
            <LoadingRow />
        </>
    )

    // const tableRef = useRef(null);

    // const handleScroll = () => {
    //   const table = tableRef.current;
    //   const fixedColumns = table.querySelectorAll(`.${styles.fixed_col}`);


    //   fixedColumns.forEach(fixedColumn => {
    //     if (table.scrollLeft > 0) {
    //       fixedColumn.style.width = '120px';
    //       fixedColumn.style.boxShadow = '10px 0 8px -8px rgba(5, 5, 5, 0.06)';
    //     } else {
    //       fixedColumn.style.boxShadow = 'none';
    //     }
    //   });
    // };

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                })
            }
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    const goBack = () => {
        router.push('/')
    }

    // const currentData = holders.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    // 处理页码改变
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    // 处理每页显示数量变化
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    useEffect(() => {
        setCurrentData(listData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => ({
            ...item,
            rank: (currentPage - 1) * pageSize + index + 1,
        })))
    }, [listData, currentPage, pageSize])

    useEffect(() => {
        const { baseURL, chainid } = chainUtils()
        const env = process.env.NODE_ENV
        const fetch = async () => {
            try {
                const { data } = await getSupply({ baseURL, chainid })
                if (data.length > 0) {
                    const obj = data.find(item => item.tick === name)
                    setSupply(obj)
                }
            } catch (error) {
                console.log(error)
                // setListData([])
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const { baseURL, chainid } = chainUtils()
        const env = process.env.NODE_ENV
        setLoading(true)
        const fetch = async () => {
            try {
                const params = {
                    tick: 'eoss',
                    limit: 500,
                    offset: 0
                }
                const { data } = await getHolders(params, { baseURL, chainid })
                if(data.length > 0){
                    setListData(data) // 用于分页
                }
                // setListData(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                // setListData([])
            }
        }
        fetch()
    }, [])


    const handleClick = () => {
        // if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
        //   handleActive()
        // } else {
        onPresentConnectModal()
        // }
    }



    const [{ attemptingTxn, pledgeErrorMessage, txHash, isSendTransfer }, setBridgeState] = useState<{
        attemptingTxn: boolean
        pledgeErrorMessage: string | undefined
        txHash: string | undefined
        isSendTransfer?: any
    }>({
        attemptingTxn: false,
        pledgeErrorMessage: undefined,
        txHash: undefined,
        isSendTransfer: false,
    })

    const successText = t('Operation Successful')
    const failText = t('Operation Failed')

    const [onBridgeResultModal] = useModal(
        <ResultModal
            pendingText={pendingText}
            hash={txHash}
            attemptingTxn={attemptingTxn}
            isSendTransfer={isSendTransfer}
            errorMessage={pledgeErrorMessage}
            successText={successText}
            // successText={t('noah383')}
            failText={failText}
            // failText={t('noah385')}
            isSuccess={() => {
                // setTimeout(() => {
                //   fetch()
                // }, 2000);
            }}
        />,
        false,
        true,
        'ResultModal',
    )

    // const validAddress = userOutAddress && ethers.utils.isAddress(userOutAddress) 
    // ? ethers.utils.getAddress(userOutAddress) 
    // : '';

    // console.log('validAddress', validAddress)

    const handleGoTransfer = async (address, amount) => {
        // setUserOutAddress(address.toString())
        // setUserOutAmount(amount.toString())
        setPendingText(`${t('Transfer')} ${formatToThousands(amount)} ${name}`)
        setBridgeState({ attemptingTxn: true, pledgeErrorMessage: undefined, txHash: undefined, isSendTransfer: true })
        onBridgeResultModal()

        const mainData = `data:,{"p":"eorc20","op":"transfer","tick":"eoss","amt":"${amount}"}`
        const utf8Bytes = Buffer.from(mainData, 'utf8')
        const memoOx = ethers.utils.hexValue(utf8Bytes)

            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                // console.log('9999', window.ethereum)
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum as ethers.providers.ExternalProvider
                    );
                    const signer = provider.getSigner();
                    const transactionParameters = {
                        // 0x487cEC520dB273f285f26acf721A24683c1192a1
                        // 0x30b7cadcb65e113abd3376dbed624e1baed9a7f3
                      to: address,
                      value: 0,
                      data: memoOx
                    };
                    const tx = await signer.sendTransaction(transactionParameters);
                    // await tx.wait();

                    setBridgeState({
                        attemptingTxn: false,
                        pledgeErrorMessage: undefined,
                        txHash: tx.hash,
                        isSendTransfer: true,
                    })
                } catch (error) {

                    const errorMessage = error.toString();
                    const mainMessage = errorMessage.split(' (')[0];
                    // console.log(mainMessage); // "Error: user rejected transaction"
                        setBridgeState({
                            attemptingTxn: false,
                            // pledgeErrorMessage: 'Error: ' + JSON.parse(JSON.stringify(error)).reason,
                            pledgeErrorMessage: mainMessage,
                            txHash: undefined,
                            isSendTransfer: true,
                        })
                }

            }
            else {
                console.log('Please install MetaMask!');
            }
    }

    const paramObj = {
        tick: name,
    }

    const [onPresentTransferEORCModal] = useModal(
        <TransferEORC20Modal handleGoTransfer={handleGoTransfer} item={paramObj} />,
        true,
        true,
        'eorcModal',
    )

    const handleGoLink = async (address) => {
        window.open('https://explorer.evm.eosnetwork.com/address/' + address)
    }

    return (
        // removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}
        <Page>
            <div className={`${styles.eorc}`} style={{ paddingBottom: isMobile && '50px' }}>
                {/* <div className={`${styles.bigTit}`}>Cheeck Out EORC-20 Balance Of The Address</div> */}
                <div className={`flex flexc`} style={{ height: '40px', marginTop: '20px' }}>
                    <div className={`${styles.backright} flex`}>
                        <div className={`${isMobile ? styles.imgbox : styles.imgbox2} flexc`} onClick={goBack}>
                            <img className={`${styles.img}`} src="/images/home/arrow-right.png" alt="" />
                        </div>
                        <Text fontSize={isMobile ? '24px' : '28px'} fontWeight="600" className="pointer" onClick={goBack}>
                            {name}
                        </Text>
                        <div className={`${styles.pe}`} style={{ marginTop: isMobile ? '2px' : '6px' }}>{supply?.protocol}</div>
                    </div>
                    <div className={`${styles.topPro}`} style={{ flex: 1 }}>
                        <div className={`${styles.progressBox} flex`} style={{ paddingLeft: isMobile ? '20px' : '50px' }}>
                            <div className={`${styles.progressContainer}`}>
                                <div className={`${styles.progressBar}`} style={{ width: (truncateZero(supply?.progress * 100 || 0, 2)) + '%' }}></div>
                            </div>
                            <span>{truncateZero(supply?.progress * 100 || 0, 2)}%</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.Box}`} style={{ margin: '10px 0', position: 'relative' }}>
                    <div className={`${styles.searchMin}`}>
                        <div className={`${styles.leftTit}`}>Overview</div>
                        { account && (
                            <div className={`${styles.btn}`}
                                onClick={() => {
                                    if (!account) {
                                        handleClick()
                                    } else {
                                        onPresentTransferEORCModal()
                                    }
                                }}
                            >Transfer</div>
                        )}
                    </div>
                    <div className={`${styles.overviewBox}`}>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Supply</div>
                            <div className={`${styles.value}`}>{formatToThousands(supply?.max_supply || 0)}</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Limit per mint</div>
                            <div className={`${styles.value}`}>{formatToThousands(supply?.limit_by_amount || 0)}</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Decimal</div>
                            <div className={`${styles.value}`}>{formatToThousands(supply?.decimal || 0)}</div>
                        </div>
                        {supply?.deploy_address && (
                            <div className={`${styles.info}`}>
                                <div className={`${styles.label}`}>Deploy By</div>
                                {windowSize.width < 800 ? (
                                    <div style={{ cursor: 'pointer' }} className={`${styles.value} ${styles.deploy_buy}`} onClick={() => { handleGoLink(supply?.deploy_address) }}>{supply?.deploy_address.substring(0, 6)}...{supply?.deploy_address.substring(supply?.deploy_address.length - 4)}</div>
                                ) : (
                                    <div style={{ cursor: 'pointer' }} className={`${styles.value} ${styles.deploy_buy}`} onClick={() => { handleGoLink(supply?.deploy_address) }}>{supply?.deploy_address}</div>
                                )}
                            </div>
                        )}
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Deploy Time</div>
                            {/* {formatTimestamp(1701931682000 / 1000, 2)} */}
                            <div className={`${styles.value}`}>{supply?.deploy_timestamp}</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Holders</div>
                            <div className={`${styles.value}`}>{formatToThousands(supply?.holders || 0)}</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.label}`}>Total Transactions</div>
                            <div className={`${styles.value}`}>{formatToThousands(supply?.transactions || 0)}</div>
                        </div>
                    </div>
                    {/* { account && (
                        <div className={`${styles.btn}`}
                            style={{ width: windowSize.width > 969 ? '120px' : '80px', height: windowSize.width > 969 ? '50px' : '30px', position: 'absolute', right: '0', bottom: '0'}}
                            onClick={() => {
                                if (!account) {
                                    handleClick()
                                } else {
                                    onPresentTransferEORCModal()
                                }
                            }}
                        ></div>
                    )} */}
                </div>
                <div className={`${styles.Box}`} style={{ margin: windowSize.width < 969 ? '20px 0 0px' : '20px 0 100px' }}>
                    <div className={`${styles.searchMin}`}>
                        <div className={`${styles.leftTit}`}>Holders</div>
                        {/* <div className={`${styles.inputs}`}>
              <input type="text" placeholder='Search' className={`${styles.input}`}/>
              <div className={`${styles.searchLogo}`}>
                <img src="/images/home/search.png" alt="" />
              </div>
            </div> */}
                    </div>
                    <div className={`${styles.tableBox}`}>
                        {windowSize.width > 1200 && (
                            <div className={`${styles.header}`}>
                                <div className={`${styles.col} ${styles.fixed_col}`}>Rank</div>
                                <div className={`${styles.col} ${styles.one}`}>Address</div>
                                <div className={`${styles.col} ${styles.two}`}>Percentage</div>
                                <div className={`${styles.col} ${styles.three}`}>Value</div>
                                {/* <div className={`${styles.col} ${styles.four}`}>Total Supply</div> */}
                                {/* <div className={`${styles.col} ${styles.five}`}></div> */}
                            </div>
                        )}
                        {windowSize.width > 1200 ? (
                            <div className={`${styles.body}`}>
                                {loading ? (
                                    <TableLoader />
                                ) : currentData?.length > 0 ? (
                                    <div>
                                        {currentData.map((item, index) => (
                                            <div className={`${styles.row}`} key={index}>
                                                <div className={`${styles.col} ${styles.fixed_col}`}>{item.rank}</div>
                                                <div style={{ cursor: 'pointer' }} className={`${styles.col} ${styles.one}`} onClick={() => { handleGoLink(item.address) }}>{item.address.substring(0, 6)}...{item.address.substring(item.address.length - 4)}</div>
                                                <div className={`${styles.col} ${styles.two}`}>
                                                    <div className={`${styles.progressBox}`}>
                                                        <span>{truncateZero(item.percentage * 100, 2)}%</span>
                                                        <div className={`${styles.progressContainer}`}>
                                                            <div className={`${styles.progressBar}`} style={{ width: truncateZero(item.percentage * 100, 2) + '%' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`${styles.col} ${styles.three}`}>{formatToThousands(item.amount || 0)}</div>
                                                {/* <div className={`${styles.col} ${styles.four}`}>{item.total_supply}</div> */}
                                                {/* <div className={`${styles.col} ${styles.five}`}>
                        <div className={`${styles.btn}`}>Detail</div>
                        </div> */}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Flex flexDirection="column" alignItems="center" justifyContent="center" height="500px">
                                        {/* <img src="/images/start/nodata.png" width={100} alt="" />  */}
                                        <Text textAlign="center" maxWidth="400px" fontSize="16px" mt="16px" color="#85868A">
                                            {t('No Data')}
                                        </Text>
                                    </Flex>
                                )}
                            </div>
                        ) : (
                            <div className={`${styles.bodyMini}`}>
                                {loading ? (
                                    <TableLoader />
                                ) : currentData?.length > 0 ? (
                                    <div>
                                        {currentData.map((item, index) => (
                                            <div className={`${styles.projectBox}`} key={index}>
                                                <div className={`${styles.project}`}>
                                                    <div className={`${styles.stack}`}>
                                                        <div className={`${styles.label}`}>Rank</div>
                                                        <div className={`${styles.val}`}>{item.rank}</div>
                                                    </div>
                                                    <div className={`${styles.stack} ${styles.rig}`}>
                                                        <div className={`${styles.label}`}>Address</div>
                                                        <div style={{ cursor: 'pointer', color: "#24C3A0", fontWeight: 'bold' }} className={`${styles.val}`} onClick={() => { handleGoLink(item.address) }}>{item.address.substring(0, 6)}...{item.address.substring(item.address.length - 4)}</div>
                                                    </div>
                                                </div>
                                                <div className={`${styles.project}`}>
                                                    <div className={`${styles.stack}`}>
                                                        <div className={`${styles.val}`} style={{ width: '120px' }}>
                                                            <div className={`${styles.progressBox}`}>
                                                                <span>{truncateZero(item.percentage * 100, 2)}%</span>
                                                                <div className={`${styles.progressContainer}`}>
                                                                    <div className={`${styles.progressBar}`} style={{ width: truncateZero(item.percentage * 100, 2) + '%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`${styles.stack} ${styles.rig}`}>
                                                        <div className={`${styles.label}`}>Value</div>
                                                        <div className={`${styles.val}`}>{formatToThousands(item.amount || 0)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Flex flexDirection="column" alignItems="center" justifyContent="center" height="500px">
                                        {/* <img src="/images/start/nodata.png" width={100} alt="" /> */}
                                        <Text textAlign="center" maxWidth="400px" fontSize="16px" mt="16px" color="#85868A">
                                            {t('No Data')}
                                        </Text>
                                    </Flex>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={`${styles.lastBox}`}>
                        <div className={`${styles.total}`}>
                            Total {formatToThousands(listData.length || 0)} Holders
                        </div>
                        <div>
                            <Pagination
                                size="small"
                                current={currentPage}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                onShowSizeChange={handlePageSizeChange}
                                total={listData.length}
                                defaultCurrent={1}
                                showSizeChanger={false} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default TickDetails
