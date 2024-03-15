import { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";
import { PublicToggleTheme } from "@inscription/uikit/src/components/InscriptionToggle/types";

export const light: PublicToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: PublicToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
