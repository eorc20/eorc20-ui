import { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";
import { shadows } from "@inscription/uikit/src/theme/base";
import { CardTheme } from "@inscription/uikit/src/components/Card/types";

export const light: CardTheme = {
  background: lightColors.backgroundAlt,
  boxShadow: shadows.level1,
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: lightColors.gradients.cardHeader,
    blue: lightColors.gradients.blue,
    bubblegum: lightColors.gradients.bubblegum,
    violet: lightColors.gradients.violet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};

export const dark: CardTheme = {
  background: darkColors.backgroundAlt,
  boxShadow: shadows.level1,
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: darkColors.gradients.cardHeader,
    blue: darkColors.gradients.blue,
    bubblegum: lightColors.gradients.bubblegum,
    violet: darkColors.gradients.violet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
