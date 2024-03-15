import React, { cloneElement, ElementType, isValidElement } from "react";
import EXTERNAL_LINK_PROPS from "@inscription/uikit/src/util/externalLinkProps";
import StyledButton from "@inscription/uikit/src/components/Button/StyledButton";
import { ButtonProps, scales, variants } from "@inscription/uikit/src/components/Button/types";

const Button = <E extends ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props;
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  if (isLoading) {
    classNames.push("inscription-button--loading");
  }

  if (isDisabled && !isLoading) {
    classNames.push("inscription-button--disabled");
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(" ")}
      disabled={isDisabled}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) && cloneElement(startIcon)}
        {children}
        {isValidElement(endIcon) && cloneElement(endIcon)}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
};

export default Button;
