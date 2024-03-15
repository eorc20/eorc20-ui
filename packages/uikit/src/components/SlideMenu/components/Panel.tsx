import React from "react";
import styled from "styled-components";
import PanelBody from "@inscription/uikit/src/components/SlideMenu/components/PanelBody";
import PanelFooter from "@inscription/uikit/src/components/SlideMenu/components/PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "@inscription/uikit/src/components/SlideMenu/config";
import { PanelProps, PushedProps } from "@inscription/uikit/src/components/SlideMenu/types";
import { LogoIcon } from "@inscription/uikit/src/components/SlideMenu/icons";
import Flex from "@inscription/uikit/src/components/Box/Flex";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean }>`
  position: fixed;
  /* padding-top: ${({ isMobile }) => (isMobile ? "80px" : 0)}; */
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed, isMobile }) => (!isMobile || isPushed ? `${SIDEBAR_WIDTH_FULL}px` : 0)};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s;
  border-right: ${({ isPushed }) => (isPushed ? "2px solid rgba(133, 133, 133, 0.1)" : 0)};
  z-index: 21;
  overflow: ${({ isPushed }) => (isPushed ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const LogoPanel = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu, isMobile } = props;
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
      <Flex justifyContent="center" alignItems="center" style={{ padding: "20px 0", marginLeft: "-15px" }}>
        {/* <img src="/images/start/logo-whites.png" width={100} height={100} alt="logo" /> */}
        {/* <img
          // src="https://s3.ap-southeast-1.amazonaws.com/public.pro/logo002.png"
          src="https://images.public.io/logo002.png"
          width={100}
          height={100}
          alt="logo"
        /> */}
      </Flex>
      <PanelBody {...props} />
      {/* <PanelFooter {...props} /> */}
    </StyledPanel>
  );
};

export default Panel;
