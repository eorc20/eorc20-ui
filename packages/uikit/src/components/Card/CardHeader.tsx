import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { CardTheme } from "@inscription/uikit/src/components/Card/types";

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme["cardHeaderBackground"];
}

const CardHeader = styled.div<CardHeaderProps>`
  background: ${({ theme, variant = "default" }) => theme.card.cardHeaderBackground[variant]};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  ${space}
`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
