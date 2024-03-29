// eslint-disabled
import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "@inscription/uikit/src/components/Box";
import { ChevronDownIcon } from "@inscription/uikit/src/components/Svg";
import { UserMenuProps, variants } from "@inscription/uikit/src/widgets/Menu/components/UserMenu/types";
import MenuIcon from "@inscription/uikit/src/widgets/Menu/components/UserMenu/MenuIcon";
import { UserMenuItem } from "@inscription/uikit/src/widgets/Menu/components/UserMenu/styles";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.tertiary}; */
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  /* box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 22px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`;

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  /* display: none; */
  font-weight: 500;
  margin-left: 8px;
  margin-right: 4px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  /* width: 280px; */
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  accountName,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  disabled,
  onPresentWalletModal,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement: "bottom",
    modifiers: [{ name: "offset", options: { offset: [5, 2] } }],
  });

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        // onTouchStart={() => {
        //   setIsOpen((s) => !s);
        // }}
        onClick={onPresentWalletModal}
      >
        {/* <MenuIcon avatarSrc={avatarSrc} variant={variant} /> */}
        {accountName ? (
          <LabelText style={{ marginBottom: "3px" }}>{accountName}</LabelText>
        ) : (
          <LabelText title={typeof text === "string" ? text || account : account}>{text || accountEllipsis}</LabelText>
        )}
        {disabled && <ChevronDownIcon color="text" width="24px" />}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;
