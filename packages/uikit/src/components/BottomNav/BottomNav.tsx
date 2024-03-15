import React, { useState, memo } from "react";
import BottomNavItem from "@inscription/uikit/src/components/BottomNavItem";
import StyledBottomNav from "@inscription/uikit/src/components/BottomNav/styles";
import { Box } from "@inscription/uikit/src/components/Box";
import DropdownMenu from "@inscription/uikit/src/components/DropdownMenu/DropdownMenu";
import { BottomNavProps } from "@inscription/uikit/src/components/BottomNav/types";
import { NotificationDot } from "@inscription/uikit/src/components/NotificationDot";
import { Overlay } from "@inscription/uikit/src/components/Overlay";

const BottomNav: React.FC<React.PropsWithChildren<BottomNavProps>> = ({
  items = [],
  activeItem = "",
  activeSubItem = "",
  ...props
}) => {
  const [menuOpenByIndex, setMenuOpenByIndex] = useState({});
  const isBottomMenuOpen = Object.values(menuOpenByIndex).some((acc) => acc);
  return (
    <>
      {isBottomMenuOpen && <Overlay />}
      <StyledBottomNav justifyContent="space-around" {...props}>
        {items.map(
          (
            { label, items: menuItems, href, icon, fillIcon, showOnMobile = true, showItemsOnMobile = true, disabled },
            index
          ) => {
            const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
            return (
              showOnMobile && (
                <DropdownMenu
                  key={`${label}#${href}`}
                  items={menuItems}
                  isBottomNav
                  activeItem={activeSubItem}
                  showItemsOnMobile={showItemsOnMobile}
                  setMenuOpenByIndex={setMenuOpenByIndex}
                  index={index}
                  isDisabled={disabled}
                >
                  <Box>
                    <NotificationDot show={!!statusColor} color={statusColor}>
                      <BottomNavItem
                        href={href}
                        disabled={disabled}
                        isActive={href === activeItem}
                        label={label}
                        icon={icon}
                        fillIcon={fillIcon}
                        showItemsOnMobile={showItemsOnMobile}
                      />
                    </NotificationDot>
                  </Box>
                </DropdownMenu>
              )
            );
          }
        )}
      </StyledBottomNav>
    </>
  );
};

export default memo(BottomNav);
