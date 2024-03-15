import { darkColors, lightColors } from "@inscription/uikit/src/theme/colors";

export type ToggleTheme = {
  handleBackground: string;
};

export const light: ToggleTheme = {
  handleBackground: lightColors.backgroundAlt3,
};

export const dark: ToggleTheme = {
  handleBackground: darkColors.backgroundAlt3,
};
