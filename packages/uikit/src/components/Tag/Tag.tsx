import React from "react";
import { scales, TagProps } from "@inscription/uikit/src/components/Tag/types";
import { StyledTag } from "@inscription/uikit/src/components/Tag/StyledTag";

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({ startIcon, endIcon, children, ...props }) => (
  <StyledTag {...props}>
    {React.isValidElement(startIcon) && React.cloneElement(startIcon)}
    {children}
    {React.isValidElement(endIcon) && React.cloneElement(endIcon)}
  </StyledTag>
);

/* eslint-disable react/default-props-match-prop-types */
Tag.defaultProps = {
  variant: "primary",
  scale: scales.MD,
  outline: false,
};

export default Tag;
