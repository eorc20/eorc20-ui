import noop from "lodash/noop";
import { DropdownMenuItems, DropdownMenuItemType } from "@inscription/uikit/src/components/DropdownMenu/types";

const ItemsMock: DropdownMenuItems[] = [
  {
    label: "Exchange",
    href: "/",
  },
  {
    label: "Liquidity",
    href: "/pool",
  },
  {
    label: "LP Migration",
    href: "https://v1exchange.public.pro/#/migrate",
    type: DropdownMenuItemType.EXTERNAL_LINK,
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    label: "Disconnect",
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
];

export default ItemsMock;
