import { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";

export interface NavThemeType {
  background: string;
}

export const light: NavThemeType = {
  background: lightColors.backgroundAlt1,
};

export const dark: NavThemeType = {
  background: darkColors.backgroundAlt1,
};
