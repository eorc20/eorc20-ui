import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { ClickableElementContainer } from "@inscription/uikit/src/components/BaseMenu/styles";
import { BaseMenuProps } from "@inscription/uikit/src/components/BaseMenu/types";
import getPortalRoot from "@inscription/uikit/src/util/getPortalRoot";

const BaseMenu: React.FC<BaseMenuProps & { children: any }> = ({ component, options, children, isOpen = false }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const placement = options?.placement ?? "bottom";
  const offset = options?.offset ?? [0, 10];
  const padding = options?.padding ?? { left: 16, right: 16 };

  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  const toggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const open = () => {
    setIsMenuOpen(true);
  };

  const close = () => {
    setIsMenuOpen(false);
  };

  // Allow for component to be controlled
  useEffect(() => {
    setIsMenuOpen(isOpen);
  }, [isOpen, setIsMenuOpen]);

  useEffect(() => {
    if (menuElement !== null && targetElement !== null) {
      const handleClickOutside = ({ target }: Event) => {
        if (target instanceof Node && !menuElement.contains(target) && !targetElement.contains(target)) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
    return undefined;
  }, [menuElement, targetElement]);

  const { styles, attributes } = usePopper(targetElement, menuElement, {
    placement,
    modifiers: [
      { name: "offset", options: { offset } },
      { name: "preventOverflow", options: { padding } },
    ],
  });

  const menu = (
    <div ref={setMenuElement} style={styles.popper} {...attributes.popper}>
      {typeof children === "function" ? children({ toggle, open, close }) : children}
    </div>
  );

  const portal = getPortalRoot();
  const renderMenu = portal ? createPortal(menu, portal) : menu;

  return (
    <>
      <ClickableElementContainer ref={setTargetElement} onClick={toggle}>
        {component}
      </ClickableElementContainer>
      {isMenuOpen && renderMenu}
    </>
  );
};

export default BaseMenu;
