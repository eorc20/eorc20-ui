import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { Overlay1 } from "@inscription/uikit/src/components/Overlay1";
import { Flex, Box } from "@inscription/uikit/src/components/Box";
import { useMatchBreakpoints } from "@inscription/uikit/src/contexts";
import Logo from "@inscription/uikit/src/components/SlideMenu/components/Logo";
import Panel from "@inscription/uikit/src/components/SlideMenu/components/Panel";
import Link from 'next/link'
// import UserBlock from "./components/UserBlock";
import LangSelector from "@inscription/uikit/src/components/LangSelector/LangSelector";
import { NavProps } from "@inscription/uikit/src/components/SlideMenu/types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL, socials } from "@inscription/uikit/src/components/SlideMenu/config";
import { flex } from "styled-system";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  // top: ${({ showMenu }) => (showMenu ? 0 : `${MENU_HEIGHT}px`)};
  top: 0;
  left: 0;
  // transition: top 0.2s;
  // background-color: #8edcff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  /* background-color: ${({ theme }) => theme.nav.background}; */
  /* background-color: transparent; */
  /* border-bottom: solid 2px rgba(133, 133, 133, 0.1); */
  z-index: 10;
  transform: translate3d(0, 0, 0);
  background-color: ${({ showMenu }) => (showMenu ? 'transparent' : `#fff`)};
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 1s ease;
`;

const StyledNavPc = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 30%;
  height: ${MENU_HEIGHT}px;
  // background-color: ${({ theme }) => theme.nav.background};
  z-index: 20;
  transform: translate3d(0, 0, 0);
  // background-color: #8edcff;
  background-color: ${({ showMenu }) => (showMenu ? 'transparent' : `#fff`)};
  // box-shadow: ${({ showMenu }) => (showMenu ? 'none' : ` 0 2px 4px rgba(0, 0, 0, 0.1);`)};
  transition: background-color 1s ease;
  width: 100%;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean, isMobile: any }>`
  flex-grow: 1;
  // margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  // ${({ theme }) => theme.mediaQueries.nav} {
  //   margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  //   max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  // }
`;

const RouterList = styled.div`
    margin-left: 80px;
    // border: 1px solid green;
    display: flex;
    div{
      margin-right: 30px;
      cursor: pointer;
      &:last-child{
        margin-right: 0px;
      }
    }
`;

const MediaList = styled.div`
  display: flex;
  margin-right: 30px;
  img{
    margin-right: 20px;
    cursor: pointer;
    &:last-child{
      margin-right: 0px;
    }
  }
`;

const PublicFooter = styled.div`
  // border: 1px solid red;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    padding: 0 0 50px;
    margin-right: 20px;
    cursor: pointer;
    &:last-child{
      margin-right: 0px;
    }
  }
`

const MobileOnlyOverlay = styled(Overlay1)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({ isDark, links, rightSide, children, currentLang, setLang, langs, balance }) => {
  // const { isXl } = useMatchBreakpoints();
  // const isMobile = isXl === false;
  const { isDesktop } = useMatchBreakpoints();
  const isMobile = isDesktop === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };

    if (!isMobile) {
      setIsPushed(true);
    }

    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [isMobile]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const routeList = links

  return (
    <Wrapper>
      {isMobile ? (
        <StyledNav showMenu={showMenu}>
          <Flex
            style={{ paddingLeft: "0px" }}
            justifyContent="center"
            alignItems="center"
            // onClick={() => setIsPushed((prevState: boolean) => !prevState)}
          >
            <Link href={'/'}><img src="/images/home/logo.png" width={ 120 } style={{cursor: 'pointer'}}/></Link>
            {/* <img src="/images/home/logo.png" width={ 120 }/> */}
          </Flex>
          {/* 导航条 */}
          <Flex alignItems="center">
            <Box mt="4px">
              {/* <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                buttonScale="xs"
                color="textSubtle"
                hideLanguage
              /> */}
            </Box>
            <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
              {rightSide}
              <div style={{fontSize: '12px'}}>{balance} eoss</div>
            </div>
            {/* <Logo
              isPushed={isPushed}
              togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
              isDark={isDark}
              href={homeLink?.href ?? "/"}
            /> */}
          </Flex>
        </StyledNav>
      ) : (
        <StyledNavPc showMenu={showMenu}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Link href={'/'}><img src="/images/home/logo.png" width={ 120 } style={{cursor: 'pointer'}}/></Link>
            
            {/* <RouterList>
              {routeList.map((item, index) => (
                <Link href={`${item.href}`} key={index}>
                  <div>{item.label}</div>
                </Link>
              ))}
            </RouterList> */}
          </div>
          {/* <Flex alignItems="center"> */}
            {/* <Box mt="6px"> */}
              {/* <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                buttonScale="xs"
                color="textSubtle"
                hideLanguage
              /> */}
            {/* </Box> */}
            <div style={{display: 'flex', alignItems: 'center'}}>
              <MediaList>
                {socials.map((item, index) => (
                  <img src={item.imgUrl} width={15} onClick={()=>{window.open(item.href)}} key={index}/>
                ))}
              </MediaList>
              {balance} eoss
              {rightSide}
            </div>
          {/* </Flex> */}
        </StyledNavPc>
      )}
      <BodyWrapper>
        {/* {isMobile && (
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            pushNav={setIsPushed}
            links={links}
          />
        )} */}
        <Inner isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
          {children}
          {isMobile && (
            <PublicFooter>
              {socials.map((item, index) => (
                <img src={item.imgUrl} width={18} onClick={()=>{window.open(item.href)}} key={index}/>
              ))}
            </PublicFooter>
          )}
        </Inner>
        
        {/* <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" /> */}
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
