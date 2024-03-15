import { ElementType, ReactElement, ReactNode } from "react";
import { FooterLinkType } from "@inscription/uikit/src/components/Footer/types";
import { MenuItemsType } from "@inscription/uikit/src/components/MenuItems/types";
import { SubMenuItemsType } from "@inscription/uikit/src/components/SubMenuItems/types";
import { Colors } from "@inscription/uikit/src/theme/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface NavProps {
  linkComponent?: ElementType;
  rightSide?: ReactNode;
  banner?: ReactElement;
  links: Array<MenuItemsType>;
  subLinks: Array<SubMenuItemsType>;
  footerLinks: Array<FooterLinkType>;
  activeItem: string;
  activeSubItem: string;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}
