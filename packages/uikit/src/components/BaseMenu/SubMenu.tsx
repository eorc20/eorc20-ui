import React from "react";
import { FlexProps } from "@inscription/uikit/src/components/Box";
import BaseMenu from "@inscription/uikit/src/components/BaseMenu/BaseMenu";
import { SubMenuContainer } from "@inscription/uikit/src/components/BaseMenu/styles";
import { BaseMenuProps } from "@inscription/uikit/src/components/BaseMenu/types";

const SubMenu: React.FC<React.PropsWithChildren<BaseMenuProps & FlexProps>> = ({
  children,
  component,
  options,
  isOpen = false,
  ...props
}) => {
  return (
    <BaseMenu component={component} options={options} isOpen={isOpen}>
      <SubMenuContainer {...props}>{children}</SubMenuContainer>
    </BaseMenu>
  );
};

export default SubMenu;
