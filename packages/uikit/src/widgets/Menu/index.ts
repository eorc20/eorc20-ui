// export { default as Menu } from "./Menu";
export type { MenuItemsType } from "@inscription/uikit/src/components/MenuItems/types";
export { DropdownMenuItemType } from "@inscription/uikit/src/components/DropdownMenu/types";
export type { FooterLinkType } from "@inscription/uikit/src/components/Footer/types";
// export { status as menuStatus, links as menuConfig } from "./config";
export { status as menuStatus } from "@inscription/uikit/src/widgets/Menu/config";
export type { Language } from "@inscription/uikit/src/widgets/Menu/types";
// export type { NavProps, Language } from "./types";

export { default as UserMenu } from "@inscription/uikit/src/widgets/Menu/components/UserMenu";
export * from "@inscription/uikit/src/widgets/Menu/components/UserMenu/styles";
export type {
  // UserMenuProps,
  variants as userMenuVariants,
  Variant as UserMenuVariant,
} from "@inscription/uikit/src/widgets/Menu/components/UserMenu/types";
export { default as Logo } from "@inscription/uikit/src/widgets/Menu/components/Logo";
