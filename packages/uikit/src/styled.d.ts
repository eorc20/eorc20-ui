import "styled-components";
import { InscriptionTheme } from "@inscription/uikit/src/theme";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends InscriptionTheme {}
}
