import styled from "styled-components";
import { Colors } from "@inscription/uikit/src/theme/types";
import Text from "@inscription/uikit/src/components/Text/Text";

const TooltipText = styled(Text)<{ decorationColor?: keyof Colors }>`
  text-decoration: ${({ theme, decorationColor }) =>
    `underline dotted ${theme?.colors && decorationColor ? theme.colors[decorationColor] : theme?.colors?.textSubtle}`};
  text-underline-offset: 0.1em;
`;

export default TooltipText;
