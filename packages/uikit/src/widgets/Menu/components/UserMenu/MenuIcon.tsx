import React from "react";
import styled from "styled-components";
import { Variant, variants } from "@inscription/uikit/src/widgets/Menu/components/UserMenu/types";
import { RefreshIcon, WalletFilledIcon, WarningIcon } from "@inscription/uikit/src/components/Svg";
import { Colors } from "@inscription/uikit/src/theme/types";

const MenuIconWrapper = styled.div<{ borderColor: keyof Colors }>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme, borderColor }) => theme.colors[borderColor]};
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  display: flex;
  height: 32px;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 32px;
  z-index: 102;
`;

const MenuIconWrapper1 = styled.div<{ borderColor: keyof Colors }>`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: center;
  left: 5px;
  position: absolute;
  top: 0;
  width: 32px;
  z-index: 102;
`;


export const NoProfileMenuIcon: React.FC<React.PropsWithChildren> = () => (
  <MenuIconWrapper1 borderColor="primary">
    {/* <WalletFilledIcon color="primary" width="24px" /> */}
    <img src="/images/start/wallet-logo.png" width={22} alt="" />
  </MenuIconWrapper1>
);

export const PendingMenuIcon: React.FC<React.PropsWithChildren> = () => (
  <MenuIconWrapper borderColor="secondary">
    {/* <RefreshIcon color="secondary" width="24px" spin /> */}
    {/* <img src="/images/start/refresh.png" width={24} alt="" /> */}
    <img src="/images/start/loadingnew.png" width={24} alt="" />
  </MenuIconWrapper>
);

export const WarningMenuIcon: React.FC<React.PropsWithChildren> = () => (
  <MenuIconWrapper borderColor="warning">
    <WarningIcon color="warning" width="24px" />
  </MenuIconWrapper>
);

export const DangerMenuIcon: React.FC<React.PropsWithChildren> = () => (
  <MenuIconWrapper borderColor="failure">
    <WarningIcon color="failure" width="24px" />
  </MenuIconWrapper>
);

const MenuIcon: React.FC<React.PropsWithChildren<{ avatarSrc?: string; variant: Variant }>> = ({
  avatarSrc,
  variant,
}) => {
  if (variant === variants.DANGER) {
    return <DangerMenuIcon />;
  }

  if (variant === variants.WARNING) {
    return <WarningMenuIcon />;
  }

  if (variant === variants.PENDING) {
    return <PendingMenuIcon />;
  }

  if (!avatarSrc) {
    return <NoProfileMenuIcon />;
  }
  return <img src="/images/start/wallet-logo.png" width={32} alt="" />
};

export default MenuIcon;
