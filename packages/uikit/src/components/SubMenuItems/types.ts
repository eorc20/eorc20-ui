/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType } from "react";
import { FlexProps } from "@inscription/uikit/src/components/Box";
import { DropdownMenuItemType } from "@inscription/uikit/src/components/DropdownMenu/types";

export type SubMenuItemsType = {
  label: string;
  href: string;
  itemProps?: any;
  icon?: ElementType<any>;
  disabled?: boolean;
  isMobileOnly?: boolean;
  type?: DropdownMenuItemType;
};

export interface SubMenuItemsProps extends FlexProps {
  items: SubMenuItemsType[];
  activeItem?: string;
  isMobileOnly?: boolean;
}
