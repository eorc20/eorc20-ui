/* eslint-disable */
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
// import formatTimestamp from '../../../utils/formatTimestamp'
import { useMatchBreakpoints} from '@inscription/uikit'
import { useRouter } from 'next/router'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useTranslation } from '@inscription/localization'
import { useExpertModeManager } from '../../state/user/hooks'
import Link from 'next/link'
import { truncateZero } from '../../utils/formatBalance'
import { formatToThousands } from '../../utils/formatInfoNumbers'
import { Flex, Text, Skeleton } from '@inscription/uikit'
import { getSupply} from '../../service/service'
import chainUtils from '../../service/chainUtils'
import { Pagination } from 'antd';
import Page from '../Page'
import styles from './style/index.module.scss'

export default function Eorc() {
  const router = useRouter()
  // 默认选中币种
  const { t, currentLanguage: { code: langCode }} = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [listData, setListData] = useState<any>([])
  const [currentData, setCurrentData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


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

  // 专家模式开关
  const [isExpertMode] = useExpertModeManager()

  const supply = [
    {
      "tick": "eoss",
      "protocol": "eorc20",
      "deploy_id": "0x120708f753e431bdfba5b7c6e58c8ea3b6375078648e48d8e354cac5f8c4ba6a",
      "deploy_address": "0x30b7cadcb65e113abd3376dbed624e1baed9a7f3",
      "deploy_timestamp": "2023-12-09 19:53:24",
      "last_block_number": 21470906,
      "last_timestamp": "2023-12-09 14:26:34",
      "limit_per_mint": "10000",
      "decimal": 0,
      "holders": "15302",
      "active_supply": "78414010000",
      "max_supply": "210000000000",
      "transactions": "7333461",
      "progress": 0.3734000476190476
    },
  ]

  // const currentData = supply.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 处理页码改变
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // 处理每页显示数量变化
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  useEffect(() => {
    setCurrentData(listData.slice((currentPage - 1) * pageSize, currentPage * pageSize))
  }, [listData, currentPage, pageSize])
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

  console.log('testtesttesttest')
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


  useEffect(() => {
    const { baseURL, chainid } = chainUtils()
    const env = process.env.NODE_ENV
    setLoading(true)
    const fetch = async () => {
      try {
        const { data } = await getSupply({ baseURL, chainid })
        if(data.length > 0){
          let first = []
          first.push(data[0])
          setListData(first) // 用于分页
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setListData([])
      }
    }
    fetch()
  }, [])

  return (
    // removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}
    <Page>
      <div className={`${styles.eorc}`} style={{paddingBottom: isMobile && '50px'}}>
        {/* <div className={`${styles.bigTit}`}>Cheeck Out EORC-20 Balance Of The Address</div> */}
        <div className={`${styles.Box}`}>
          <div className={`${styles.searchMin}`}>
            <div className={`${styles.leftTit}`}>EORC-20</div>
            <div className={`${styles.inputs}`}>
              <input type="text" placeholder='Search' className={`${styles.input}`}/>
              <div className={`${styles.searchLogo}`}>
                <img src="/images/home/search.png" alt="" />
              </div>
            </div>
          </div>
          <div className={`${styles.tableBox}`}>
            { windowSize.width > 1200 && (
              <div className={`${styles.header}`}>
                <div className={`${styles.col} ${styles.fixed_col}`}>Tick</div>
                <div className={`${styles.col} ${styles.one}`}>Deploy Time</div>
                <div className={`${styles.col} ${styles.two}`}>Progress</div>
                <div className={`${styles.col} ${styles.three}`}>Holders</div>
                <div className={`${styles.col} ${styles.four}`}>Total Supply</div>
                <div className={`${styles.col} ${styles.five}`}></div>
              </div>
            )}
            { windowSize.width > 1200 ? (
              <div className={`${styles.body}`}>
                {loading ? (
                  <TableLoader />
                ) : currentData?.length > 0 ? (
                  <div>
                    {currentData.map((item, index) => (
                      <Link href={`/tick/${item.tick}`} key={index}>
                        <div className={`${styles.row}`} key={index}>
                          <div className={`${styles.col} ${styles.fixed_col}`}>{item.tick}</div>
                          {/* {formatTimestamp(item.deploy_time / 1000, 2)} */}
                          <div className={`${styles.col} ${styles.one}`}>{item.deploy_timestamp}</div>
                          <div className={`${styles.col} ${styles.two}`}>
                            <div className={`${styles.progressBox}`}>
                              <span>{truncateZero(item.progress * 100, 2)}%</span>
                              <div className={`${styles.progressContainer}`}>
                                <div className={`${styles.progressBar}`} style={{width: truncateZero(item.progress * 100, 2) + '%'}}></div>
                              </div>
                            </div>
                          </div>
                          <div className={`${styles.col} ${styles.three}`}>{formatToThousands(item.holders)}</div>
                          <div className={`${styles.col} ${styles.four}`}>{formatToThousands(item.max_supply)}</div>
                          <div className={`${styles.col} ${styles.five}`}>
                            <div className={`${styles.btn}`}>Detail</div>
                          </div>
                        </div>
                      </Link>
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
                    <Link href={`/tick/${item.tick}`} key={index}>
                      <div className={`${styles.projectBox}`} key={index}>
                        <div className={`${styles.project}`}>
                          <div className={`${styles.stack}`}>
                            <div className={`${styles.val} ${styles.tick}`}>{item.tick}</div>
                          </div>
                          <div className={`${styles.stack} ${styles.rig}`}>
                            <div className={`${styles.label}`}>Total Supply</div>
                            <div className={`${styles.val}`}>{formatToThousands(item.max_supply)}</div>
                          </div>
                        </div>
                        <div className={`${styles.project}`}>
                          <div className={`${styles.stack}`}>
                            <div className={`${styles.label}`}>Deploy Time</div>
                            {/* {formatTimestamp(item.deploy_time / 1000, 2)} */}
                            <div className={`${styles.val}`}>{item.deploy_timestamp}</div>
                          </div>
                          <div className={`${styles.stack} ${styles.rig}`}>
                            <div className={`${styles.label}`}>Holders</div>
                            <div className={`${styles.val}`}>{formatToThousands(item.holders)}</div>
                          </div>
                        </div>
                        <div className={`${styles.project}`}>
                          <div className={`${styles.stack}`}>
                            <div className={`${styles.val}`} style={{width: '120px'}}>
                              <div className={`${styles.progressBox}`}>
                                <span>{truncateZero(item.progress * 100, 2)}%</span>
                                <div className={`${styles.progressContainer}`}>
                                  <div className={`${styles.progressBar}`} style={{width: truncateZero(item.progress * 100, 2) + '%'}}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`${styles.stack}`}>
                          <div className={`${styles.btn}`}>Detail</div>
                          </div>
                        </div>
                      </div>
                    </Link>
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
            )}
          </div>

          <div className={`${styles.lastBox}`}>
            {/* <div className={`${styles.total}`}>
              Total {holders.length} Holders
            </div> */}
            <div></div>
            <div>
              <Pagination
                size="small"
                current={currentPage}
                pageSize={pageSize}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                total={listData.length}
                defaultCurrent={1}
                showSizeChanger={false}/>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
