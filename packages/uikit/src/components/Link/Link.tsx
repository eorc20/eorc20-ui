import React from "react";
import styled from "styled-components";
import EXTERNAL_LINK_PROPS from "@inscription/uikit/src/util/externalLinkProps";
import Text from "@inscription/uikit/src/components/Text/Text";
import { LinkProps } from "@inscription/uikit/src/components/Link/types";

const StyledLink = styled(Text) <LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  /* margin-bottom: 20px; */
`;

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({ external, ...props }) => {
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  return <StyledLink as="a" bold {...internalProps} {...props} />;
};

/* eslint-disable react/default-props-match-prop-types */
Link.defaultProps = {
  color: "primary",
};

export default Link;
