import React from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_ENTRY_HEIGHT } from "@inscription/uikit/src/components/SlideMenu/config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? "#000" : "#fff")};
  flex-grow: 1;
  /* &:hover {
    color: #000;
  } */
  height: ${MENU_ENTRY_HEIGHT}px;
  line-height: ${MENU_ENTRY_HEIGHT}px;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 180px;
  margin: 0 auto;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.tertiary : "transparent")};
  border-radius: 15px;
  margin-bottom: 10px;
  /* box-shadow: ${({ isActive, theme }) => (isActive ? `inset 4px 0px 0px ${theme.colors.primary}` : "none")}; */

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  svg {
    fill: gray;
  }

  &:hover {
    /* background-color: ${({ theme }) => theme.colors.tertiary}; */
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
  &:hover {
    // border: 1px solid red;
    /* background: #69696a; */
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

// const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isActive === next.isActive);
const LinkLabelMemo = LinkLabel;

export { MenuEntry, LinkLabelMemo as LinkLabel };
