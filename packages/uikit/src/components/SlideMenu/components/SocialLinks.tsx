import React from "react";
import styled from "styled-components";
import { marginRight } from "styled-system";
import { SvgProps } from "@inscription/uikit/src/components/Svg";
import Box from "@inscription/uikit/src/components/Box/Box";
// import Dropdown from "../../Dropdown/Dropdown";
import Link from "@inscription/uikit/src/components/Link/Link";
import * as IconModule from "@inscription/uikit/src/components/SlideMenu/icons";
import { socials } from "@inscription/uikit/src/components/SlideMenu/config";
import { Flex } from "@inscription/uikit/src/components/Box";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const IconLabel = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
`;

const SocialLinks: React.FC = () => (
  <Flex style={{ flexWrap: "wrap", paddingTop: "12px" }}>
    {socials.map((social, index) => {
      // const Icon = Icons[social.icon];
      const iconProps = { width: "22px", height: "22px", color: "#fff", style: { cursor: "pointer" } };
      const mr = index < socials.length - 1 ? "0px" : 0;
      return (
        <StyledLink
          key={social.id}
          href={social.href}
          style={{
            marginRight: mr,
            width: "33.33%",
            display: "flex",
            alignItems: "center",
            justifyContent: index === 0 || index === 3 ? "flex-start" : index === 2 ? "flex-end" : "center",
            marginBottom: "10px",
          }}
          target="_blank"
        >
          <div style={{ lineHeight: 0, marginLeft: index === 0 ? "-2px" : "0" }}>
            {social.imgUrl && (
              <img src={social.imgUrl} width="18" height="18" alt="logo" style={{ marginRight: "0px" }} />
            // ) : (
            //   <Icon {...iconProps} />
            )}
          </div>
          {/* <IconLabel>{social.label}</IconLabel> */}
        </StyledLink>
      );
    })}
  </Flex>
);

export default React.memo(SocialLinks, () => true);
