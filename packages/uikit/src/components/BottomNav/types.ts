import { BoxProps } from "@inscription/uikit/src/components/Box";
import { MenuItemsType } from "@inscription/uikit/src/components/MenuItems/types";

export interface BottomNavProps extends BoxProps {
  items: MenuItemsType[];
  activeItem?: string;
  activeSubItem?: string;
}
