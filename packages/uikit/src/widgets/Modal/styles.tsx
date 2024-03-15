import React from "react";
import styled from "styled-components";
import Flex from "@inscription/uikit/src/components/Box/Flex";
import { MotionBox } from "@inscription/uikit/src/components/Box";
import { ArrowBackIcon, CloseIcon } from "@inscription/uikit/src/components/Svg";
import { IconButton } from "@inscription/uikit/src/components/Button";
import { ModalProps } from "@inscription/uikit/src/widgets/Modal/types";

export const mobileFooterHeight = 73;

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  /* border-bottom: 1px solid transparent; */
  display: flex;
  padding: 12px 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ background }) => background || "transparent"};
  }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  /* max-height: calc(90vh - ${mobileFooterHeight}px); */
  min-height: 300px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    /* max-height: 90vh; */
  }
`;

export const ModalCloseButton: React.FC<React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }>> = ({
  onDismiss,
}) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="#000" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="#000" />
    </IconButton>
  );
};

export const ModalContainer = styled(MotionBox)<{ $minWidth: string; $minHeight?: string; isMobile?: boolean }>`
  overflow: hidden;
  background: ${({ theme }) => theme.modal.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 32px 32px 0px 0px;
  width: 100%;
  /* max-height: calc(var(--vh, 1vh) * 100); */
  /* min-height: 30vh; */
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: absolute;
  min-width: ${({ $minWidth }) => `${$minWidth} !important`};
  bottom: 0;
  max-width: none !important;
  // min-height: 500px !important;
  // min-height: ${({ $minHeight, isMobile }) => (!isMobile ? `${$minHeight} !important` : `${$minHeight} !important`)};
  // min-height: 70vh;
  max-height: 80vh;
  // overflow-y: scroll;

  ${({ theme }) => theme.mediaQueries.md} {
    // width: auto;
    width: 400px;
    // width: ${({ $minWidth }) => `${$minWidth} !important`};
    position: auto;
    bottom: auto;
    border-radius: 32px;
    max-width: 100%;
    max-height: 100vh;
  }
`;
