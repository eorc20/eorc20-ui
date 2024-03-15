import { AlertTheme } from "@inscription/uikit/src/components/Alert/types";
import { CardTheme } from "@inscription/uikit/src/components/Card/types";
import { PublicToggleTheme } from "@inscription/uikit/src/components/InscriptionToggle/types";
import { RadioTheme } from "@inscription/uikit/src/components/Radio/types";
import { ToggleTheme } from "@inscription/uikit/src/components/Toggle/theme";
import { TooltipTheme } from "@inscription/uikit/src/components/Tooltip/types";
import { NavThemeType } from "@inscription/uikit/src/widgets/Menu/theme";
import { ModalTheme } from "@inscription/uikit/src/widgets/Modal/types";
import { Breakpoints, Colors, MediaQueries, Radii, Shadows, Spacing, ZIndices } from "@inscription/uikit/src/theme/types";

export interface InscriptionTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: Colors;
  card: CardTheme;
  nav: NavThemeType;
  modal: ModalTheme;
  publicToggle: PublicToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: Spacing;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
}

export { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";
export { default as dark } from "@inscription/uikit/src/theme/dark";
export { default as light } from "@inscription/uikit/src/theme/light";
export * from "@inscription/uikit/src/theme/types";
