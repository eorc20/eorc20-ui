import { DefaultTheme } from "styled-components";
import { light as lightAlert } from "@inscription/uikit/src/components/Alert/theme";
import { light as lightCard } from "@inscription/uikit/src/components/Card/theme";
import { light as lightPublicToggle } from "@inscription/uikit/src/components/InscriptionToggle/theme";
import { light as lightRadio } from "@inscription/uikit/src/components/Radio/theme";
import { light as lightToggle } from "@inscription/uikit/src/components/Toggle/theme";
import { light as lightTooltip } from "@inscription/uikit/src/components/Tooltip/theme";
import { light as lightNav } from "@inscription/uikit/src/widgets/Menu/theme";
import { light as lightModal } from "@inscription/uikit/src/widgets/Modal/theme";
import base from "@inscription/uikit/src/theme/base";
import { lightColors } from "@inscription/uikit/src/theme/colors";

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  alert: lightAlert,
  colors: lightColors,
  card: lightCard,
  toggle: lightToggle,
  nav: lightNav,
  modal: lightModal,
  publicToggle: lightPublicToggle,
  radio: lightRadio,
  tooltip: lightTooltip,
};

export default lightTheme;
