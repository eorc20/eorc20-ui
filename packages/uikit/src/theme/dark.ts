import { DefaultTheme } from "styled-components";
import { dark as darkAlert } from "@inscription/uikit/src/components/Alert/theme";
import { dark as darkCard } from "@inscription/uikit/src/components/Card/theme";
import { dark as darkPublicToggle } from "@inscription/uikit/src/components/InscriptionToggle/theme";
import { dark as darkRadio } from "@inscription/uikit/src/components/Radio/theme";
import { dark as darkToggle } from "@inscription/uikit/src/components/Toggle/theme";
import { dark as darkNav } from "@inscription/uikit/src/widgets/Menu/theme";
import { dark as darkModal } from "@inscription/uikit/src/widgets/Modal/theme";
import { dark as darkTooltip } from "@inscription/uikit/src/components/Tooltip/theme";
import base from "@inscription/uikit/src/theme/base";
import { darkColors } from "@inscription/uikit/src/theme/colors";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  alert: darkAlert,
  colors: darkColors,
  card: darkCard,
  toggle: darkToggle,
  nav: darkNav,
  modal: darkModal,
  publicToggle: darkPublicToggle,
  radio: darkRadio,
  tooltip: darkTooltip,
};

export default darkTheme;
