import React from "react";
import { StyledCard, StyledCardInner } from "@inscription/uikit/src/components/Card/StyledCard";
import { CardProps } from "@inscription/uikit/src/components/Card/types";

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ ribbon, children, background, ...props }) => {
  return (
    <StyledCard {...props}>
      <StyledCardInner background={background} hasCustomBorder={!!props.borderBackground}>
        {ribbon}
        {children}
      </StyledCardInner>
    </StyledCard>
  );
};
export default Card;
