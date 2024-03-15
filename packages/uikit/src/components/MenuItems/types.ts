/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType } from "react";
import { BoxProps } from "@inscription/uikit/src/components/Box";
import { DropdownMenuItems } from "@inscription/uikit/src/components/DropdownMenu/types";

export type MenuItemsType = {
  label: string;
  href: string;
  icon?: ElementType<any>;
  fillIcon?: ElementType<any>;
  items?: DropdownMenuItems[];
  disabled?: boolean;
  showOnMobile?: boolean;
  showItemsOnMobile?: boolean;
};

export interface MenuItemsProps extends BoxProps {
  items: MenuItemsType[];
  activeItem?: string;
  activeSubItem?: string;
}
