import { ReactElement, ReactNode } from "react";
import { FlexProps } from "@inscription/uikit/src/components/Box";

export const variants = {
  DEFAULT: "default",
  WARNING: "warning",
  DANGER: "danger",
  PENDING: "pending",
} as const;

export type Variant = (typeof variants)[keyof typeof variants];

export interface UserMenuProps extends Omit<FlexProps, "children"> {
  account?: string;
  accountName?: string;
  text?: ReactNode;
  avatarSrc?: string;
  variant?: Variant;
  disabled?: boolean;
  children?: (exposedProps: { isOpen: boolean }) => ReactElement;
  onPresentWalletModal?: () => void;
}

export interface UserMenuItemProps {
  disabled?: boolean;
}
