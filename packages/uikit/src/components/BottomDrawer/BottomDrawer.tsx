import React, { useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import useDelayedUnmount from "@inscription/uikit/src/hooks/useDelayedUnmount";
import { useMatchBreakpoints } from "@inscription/uikit/src/contexts";
import useOnClickOutside from "@inscription/uikit/src/hooks/useOnClickOutside";
import getPortalRoot from "@inscription/uikit/src/util/getPortalRoot";
import { Box } from "@inscription/uikit/src/components/Box";
import { IconButton } from "@inscription/uikit/src/components/Button";
import { Overlay } from "@inscription/uikit/src/components/Overlay";
import { CloseIcon } from "@inscription/uikit/src/components/Svg";
import { DrawerContainer } from "@inscription/uikit/src/components/BottomDrawer/styles";

interface BottomDrawerProps {
  content: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomDrawer: React.FC<React.PropsWithChildren<BottomDrawerProps>> = ({ content, isOpen, setIsOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldRender = useDelayedUnmount(isOpen, 350);
  const { isMobile } = useMatchBreakpoints();

  useOnClickOutside(
    ref?.current,
    useCallback(() => setIsOpen(false), [setIsOpen])
  );

  if (!shouldRender || !isMobile) {
    return null;
  }

  const portal = getPortalRoot();

  if (portal)
    return createPortal(
      <>
        <Overlay isUnmounting={!isOpen} />
        <DrawerContainer ref={ref} isUnmounting={!isOpen}>
          <Box position="absolute" right="16px" top="0">
            <IconButton variant="text" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {content}
        </DrawerContainer>
      </>,
      portal
    );
  return null;
};

export default BottomDrawer;
