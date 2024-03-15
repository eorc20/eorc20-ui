import ItemsMock from "@inscription/uikit/src/components/DropdownMenu/mock";
import { MenuItemsType } from "@inscription/uikit/src/components/MenuItems/types";
import {
  SwapFillIcon,
  SwapIcon,
  EarnFillIcon,
  EarnIcon,
  NftFillIcon,
  NftIcon,
  MoreIcon,
  TrophyIcon,
  TrophyFillIcon,
} from "@inscription/uikit/src/components/Svg";

const MenuItemsMock: MenuItemsType[] = [
  {
    label: "Swap",
    href: "/",
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    items: ItemsMock,
    showItemsOnMobile: false,
  },
  {
    label: "Earn",
    href: "/earn",
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    items: ItemsMock,
    showItemsOnMobile: true,
  },
  {
    label: "Gagnez des jetons",
    href: "/win",
    icon: TrophyIcon,
    fillIcon: TrophyFillIcon,
    items: ItemsMock,
    showItemsOnMobile: true,
  },
  {
    label: "NFT",
    href: "/nft",
    icon: NftIcon,
    fillIcon: NftFillIcon,
    items: ItemsMock,
  },
  {
    label: "More",
    href: "/more",
    icon: MoreIcon,
    items: ItemsMock,
    showItemsOnMobile: true,
  },
];

export default MenuItemsMock;
