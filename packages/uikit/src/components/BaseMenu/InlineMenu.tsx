import React from "react";
import { BoxProps } from "@inscription/uikit/src/components/Box";
import BaseMenu from "@inscription/uikit/src/components/BaseMenu/BaseMenu";
import { InlineMenuContainer } from "@inscription/uikit/src/components/BaseMenu/styles";
import { BaseMenuProps } from "@inscription/uikit/src/components/BaseMenu/types";

const InlineMenu: React.FC<React.PropsWithChildren<BaseMenuProps & BoxProps>> = ({
  children,
  component,
  isOpen = false,
  ...props
}) => {
  return (
    <BaseMenu options={{ placement: "bottom" }} component={component} isOpen={isOpen}>
      <InlineMenuContainer {...props}>{children}</InlineMenuContainer>
    </BaseMenu>
  );
};

export default InlineMenu;
