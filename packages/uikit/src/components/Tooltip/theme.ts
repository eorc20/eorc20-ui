import { shadows } from "@inscription/uikit/src/theme/base";
import { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";
import { TooltipTheme } from "@inscription/uikit/src/components/Tooltip/types";

export const light: TooltipTheme = {
  background: darkColors.backgroundAlt,
  text: darkColors.text,
  boxShadow: shadows.tooltip,
};

export const dark: TooltipTheme = {
  background: lightColors.backgroundAlt,
  text: lightColors.text,
  boxShadow: shadows.tooltip,
};
