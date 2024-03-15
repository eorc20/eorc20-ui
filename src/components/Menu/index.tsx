// import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { BrowserRouter } from 'react-router-dom'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Menu as UikitMenu } from '@inscription/uikit'
import { useTranslation, languageList } from '@inscription/localization'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import { useState, useMemo, useEffect } from 'react'
import chainUtils from 'service/chainUtils'
import { useWeb3React } from '@inscription/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokens } from 'service/service'
import { formatToThousands } from 'utils/formatInfoNumbers'
import { links } from '@inscription/uikit/src/components/SlideMenu/config'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'

const Menu = (props) => {
  const { currentLanguage, setLanguage } = useTranslation()
  const { pathname } = useRouter()
  const menuItems = useMenuItems()
  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  const { chainId } = useActiveWeb3React()
  const { account } = useWeb3React()
  const [bal, setBal] = useState<any>(0) // bal

  useEffect(() => {
    const { baseURL, chainid } = chainUtils(chainId)
    const fetch = async () => {
      const params = {
        address: account,
        // address: '0x64100aed32814e60604611fd4d860edf81234567',
        // address: '0x5EB954fB68159e0b7950936C6e1947615b75C895',
      }
      const { data } = await getTokens(params, {baseURL, chainid})
        if (data && data.length > 0) {
          const obj = data.find(a => a.tick === 'eoss')
          // console.log('obj', obj.amount)
          setBal(obj.amount)
        } else {
          setBal(0)
        }
      // }
    }
    let intervalId;
    
    if(account){
      fetch()
      intervalId = setInterval(fetch, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [account])

  return (
    <>
      <BrowserRouter>
        <UikitMenu
          links={links}
          isDark
          currentLang={currentLanguage.code}
          langs={languageList}
          setLang={setLanguage}
          balance={formatToThousands(bal)}
          rightSide={
            <>
              {/* <NetworkSwitcher /> */}
              <UserMenu />
            </>
          }
          {...props}
        />
      </BrowserRouter>
    </>
  )
}

export default Menu
