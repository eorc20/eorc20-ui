import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import EXTERNAL_LINK_PROPS from "@inscription/uikit/src/util/externalLinkProps";
import Grid from "@inscription/uikit/src/components/Box/Grid";
import Box from "@inscription/uikit/src/components/Box/Box";
import getThemeValue from "@inscription/uikit/src/util/getThemeValue";
import Text from "@inscription/uikit/src/components/Text/Text";
import Heading from "@inscription/uikit/src/components/Heading/Heading";
import { Button } from "@inscription/uikit/src/components/Button";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "@inscription/uikit/src/widgets/Modal";
import WalletCard, { MoreWalletCard } from "@inscription/uikit/src/widgets/WalletModal/WalletCard";
import config, { walletLocalStorageKey } from "@inscription/uikit/src/widgets/WalletModal/config";
import { Config, Login } from "@inscription/uikit/src/widgets/WalletModal/types";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
  t: (key: string) => string;
  connectors?: any;
}

const WalletWrapper = styled(Box)`
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`;

const getPriority = (priority: Config["priority"]) => (typeof priority === "function" ? priority() : priority);

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => getPriority(a.priority) - getPriority(b.priority));

  const preferredWalletName = localStorage?.getItem(walletLocalStorageKey);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
};

const ConnectModal: React.FC<React.PropsWithChildren<Props>> = ({
  login,
  onDismiss = () => null,
  displayCount = 7,
  t,
  connectors,
}) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  // const sortedConfig = getPreferredConfig(connectors || config);
  // Filter out WalletConnect if user is inside TrustWallet built-in browser
  const walletsToShow: any =
    window.ethereum?.isTrust &&
    // @ts-ignore
    !window?.ethereum?.isSafePal
      ? connectors.filter((wallet: any) => wallet.title !== "WalletConnect")
      : connectors;
  const displayListConfig = showMore ? walletsToShow : walletsToShow.slice(0, displayCount);

  return (
    <ModalContainer $minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>{t("public1")}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody minWidth={["320px", null, "340px"]}>
        <WalletWrapper pt="0" pb="24px" maxHeight="453px" overflowY="auto">
          <Grid gridTemplateColumns="auto">
            {displayListConfig.map((wallet: any) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {/* {!showMore && <MoreWalletCard t={t} onClick={() => setShowMore(true)} />} */}
          </Grid>
        </WalletWrapper>
        {/* <Box p="24px">
          <Text textAlign="center" color="textSubtle" as="p" mb="16px">
            {t("Haven’t got a crypto wallet yet?")}
          </Text>
          <Button
            as="a"
            href="https://docs.public.pro/get-started/connection-guide"
            variant="subtle"
            width="100%"
            {...EXTERNAL_LINK_PROPS}
          >
            {t("Learn How to Connect")}
          </Button>
        </Box> */}
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
