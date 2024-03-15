/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Button, useModal } from "@inscription/uikit";
import { useTranslation } from "@inscription/localization";
import NetworkModal from "../../../../../../src/components/Menu/UserMenu/NetworkModal";
import RpcModal from "../../../../../../src/components/Menu/UserMenu/RpcModal";

import LanguageModal from "../../../../../../src/components/Menu/UserMenu/LanguageModal";
import { CogIcon } from "@inscription/uikit/src/components/Svg";
import IconButton from "@inscription/uikit/src/components/Button/IconButton";
import { MENU_ENTRY_HEIGHT, socialsMore } from "@inscription/uikit/src/components/SlideMenu/config";
import { PanelProps, PushedProps } from "@inscription/uikit/src/components/SlideMenu/types";
import SocialLinks from "@inscription/uikit/src/components/SlideMenu/components/SocialLinks";

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 20px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  /* height: 260px; */
  margin-bottom: 20px;
`;

const SocialEntry = styled.div`
  /* height: ${MENU_ENTRY_HEIGHT}px; */
  padding: 0 16px;
`;

const AddLinks = styled.div`
  /* padding: 16px 0; */
  color: #000;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
`;
const IconLabel = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
`;

const PanelFooter: React.FC<Props> = ({ isPushed, pushNav }) => {
  const {
    currentLanguage: { code: langCode },
    t,
  } = useTranslation();
  let jumpHref = "https://public-finance.gitbook.io/public/";
  if (langCode === "zh-tw") {
    jumpHref = "https://public-finance.gitbook.io/public/v/fan-ti/";
  } else if (langCode === "ko") {
    jumpHref = "https://public-finance.gitbook.io/public/v/undefined/";
  }
  // const [onPresentNetworkModal] = useModal(<NetworkModal />);
  const [onPresentNetworkModal] = useModal(<RpcModal />);
  const [onPresentLanguageModal] = useModal(<LanguageModal />);
  const onClickWalletMenu = (id: string) => {
    if (id === "Docs") {
      window.open(jumpHref);
      return;
    }
    if (id === "Network") {
      onPresentNetworkModal();
    }
    if (id === "Language") {
      onPresentLanguageModal();
    }
  };

  return (
    <Container>
      <SocialEntry>
        {/* <AddLinks>
          {socialsMore?.map((social) => {
            return (
              <Flex
                key={social.label}
                mb={social.id === "Docs" ? "6px" : "3px"}
                mr="24px"
                alignItems="center"
                height={30}
              >
                <Button
                  onClick={() => onClickWalletMenu(social.id)}
                  style={{ background: "transparent", padding: 0, border: 0 }}
                >
                  <img
                    src={social.imgUrl}
                    width={social.id === "Docs" ? 14 : 18}
                    height={social.id === "Docs" ? 14 : 18}
                    alt="logo"
                    style={{
                      marginRight: social.id === "Docs" ? "6px" : "4px",
                      marginLeft: social.id === "Docs" ? "4px" : "2px",
                    }}
                  />
                  <IconLabel>{t(social.label)}</IconLabel>
                </Button>
              </Flex>
            );
          })}
        </AddLinks> */}
        <SocialLinks />
      </SocialEntry>
    </Container>
  );
};

export default PanelFooter;
