import React from "react";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";
import Button from "@inscription/uikit/src/components/Button/Button";
import Text from "@inscription/uikit/src/components/Text/Text";
import MoreHorizontal from "@inscription/uikit/src/components/Svg/Icons/MoreHorizontal";
import { ButtonProps } from "@inscription/uikit/src/components/Button";
import { connectorLocalStorageKey, walletConnectConfig, walletLocalStorageKey } from "@inscription/uikit/src/widgets/WalletModal/config";
import { Login, Config } from "@inscription/uikit/src/widgets/WalletModal/types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text", py: "16px" })`
  display: flex;
  height: auto;
  justify-content: flex-start;
  padding: 15px 40px;
`;

interface MoreWalletCardProps extends ButtonProps {
  t: (key: string) => string;
}

export const MoreWalletCard: React.FC<React.PropsWithChildren<MoreWalletCardProps>> = ({ t, ...props }) => {
  return (
    <WalletButton variant="tertiary" {...props}>
      <MoreHorizontal width="40px" mb="8px" color="textSubtle" />
      <Text fontSize="14px">{t("More")}</Text>
    </WalletButton>
  );
};

const WalletCard: React.FC<React.PropsWithChildren<Props>> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        // TW point to WC on desktop
        if (title === "Trust Wallet" && walletConnectConfig && isDesktop) {
          login(walletConnectConfig.connectorId);
          localStorage?.setItem(walletLocalStorageKey, walletConnectConfig.title);
          localStorage?.setItem(connectorLocalStorageKey, walletConnectConfig.connectorId);
          onDismiss();
          return;
        }
        if (!window.ethereum && walletConfig.href) {
          window.open(walletConfig.href, "_blank", "noopener noreferrer");
        } else {
          login(walletConfig.connectorId);
          localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
          localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
          onDismiss();
        }
      }}
      id={`wallet-connect-${title.toLowerCase()}`}
    >
      {title === "FoxWallet" ? (
        <img src="/images/start/fox.png" alt="" style={{ width: "34px", marginRight: "10px" }} />
      ) : title === "Bitkeep Wallet" ? (
        <img src="/images/start/bit.svg" alt="" style={{ width: "32px", marginRight: "12px" }} />
      ) : (
        <Icon width="34px" mr="10px" />
      )}
      <Text fontSize="14px">{title}</Text>
    </WalletButton>
  );
};

export default WalletCard;
