import { AnchorHTMLAttributes } from "react";
import { TextProps } from "@inscription/uikit/src/components/Text";

export interface LinkProps extends TextProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  showIcon?: boolean;
  iconShow?: boolean;
}
