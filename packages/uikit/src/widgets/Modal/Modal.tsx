import React, { useRef } from "react";
import { useTheme } from "styled-components";
import Heading from "@inscription/uikit/src/components/Heading/Heading";
import getThemeValue from "@inscription/uikit/src/util/getThemeValue";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "@inscription/uikit/src/widgets/Modal/styles";
import { ModalProps } from "@inscription/uikit/src/widgets/Modal/types";
import { useMatchBreakpoints } from "@inscription/uikit/src/contexts";

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  headerBackground = "transparent",
  minWidth = "320px",
  minHeight = "500px",
  icon = false,
  ...props
}) => {
  const theme = useTheme();
  const { isMobile } = useMatchBreakpoints();
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    // @ts-ignore
    <ModalContainer
      drag={isMobile ? "y" : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = "none";
      }}
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss();
      }}
      ref={wrapperRef}
      $minWidth={minWidth}
      $minHeight={minHeight}
      isMobile={isMobile}
      {...props}
    >
      <ModalHeader background={getThemeValue(theme, `colors.${headerBackground}`, headerBackground)}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
