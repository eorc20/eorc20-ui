import styled from "styled-components";
import { space, variant as StyledSystemVariant } from "styled-system";
import { lightColors } from "@inscription/uikit/src/theme";
import { styleVariants, styleScales } from "@inscription/uikit/src/components/Progress/themes";
import { ProgressProps, variants } from "@inscription/uikit/src/components/Progress/types";

interface ProgressBarProps {
  primary?: boolean;
  $useDark: boolean;
  $background?: string;
}

export const Bar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme, $useDark, primary, $background }) => {
    if ($background) return $background;
    if ($useDark) return primary ? theme.colors.secondary : `${theme.colors.secondary}80`;
    return primary ? lightColors.secondary : `${lightColors.secondary}80`;
  }};
  height: 100%;
  transition: width 200ms ease;
`;

Bar.defaultProps = {
  primary: false,
};

interface StyledProgressProps {
  variant: ProgressProps["variant"];
  scale: ProgressProps["scale"];
  $useDark: boolean;
}

const StyledProgress = styled.div<StyledProgressProps>`
  position: relative;
  background-color: ${({ theme, $useDark }) => ($useDark ? theme.colors.input : lightColors.input)};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  overflow: hidden;

  ${Bar} {
    border-top-left-radius: ${({ variant }) => (variant === variants.FLAT ? "0" : "32px")};
    border-bottom-left-radius: ${({ variant }) => (variant === variants.FLAT ? "0" : "32px")};
  }

  ${StyledSystemVariant({
    variants: styleVariants,
  })}
  ${StyledSystemVariant({
    prop: "scale",
    variants: styleScales,
  })}
  ${space}
`;

export default StyledProgress;
