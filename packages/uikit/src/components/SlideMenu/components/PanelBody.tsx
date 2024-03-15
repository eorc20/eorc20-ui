import React, { useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "@inscription/localization";
import { SvgProps } from "@inscription/uikit/src/components/Svg";
import * as IconModule from "@inscription/uikit/src/components/SlideMenu/icons";
import Accordion from "@inscription/uikit/src/components/SlideMenu/components/Accordion";
import { MenuEntry } from "@inscription/uikit/src/components/SlideMenu/components/MenuEntry";
import MenuLink from "@inscription/uikit/src/components/SlideMenu/components/MenuLink";
import { PanelProps, PushedProps } from "@inscription/uikit/src/components/SlideMenu/types";
import { MENU_ENTRY_HEIGHT } from "@inscription/uikit/src/components/SlideMenu/config";
import PanelFooter from "@inscription/uikit/src/components/SlideMenu/components/PanelFooter";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };
const LinkLabel = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ isActive }) => (isActive ? "#000" : "#fff")};
  flex-grow: 1;
  /* &:hover {
    color: #000;
  } */
  height: ${MENU_ENTRY_HEIGHT}px;
  line-height: ${MENU_ENTRY_HEIGHT}px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  justify-content: inherit;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useRouter();
  const { t } = useTranslation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  return (
    <Container>
      <div>
        {links.map((entry) => {
          const Icon = entry.icon;
          // const iconElement = <Icon width="24px" mr="8px" />;
          const iconElement =
            entry.href === location.pathname ? (
              <img src={`/images/start/${Icon}-active.png`} width={24} alt="logo" style={{ marginRight: "6px" }} />
            ) : (
              <img src={`/images/start/${Icon}.png`} width={24} alt="logo" style={{ marginRight: "6px" }} />
            );

          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

          if (entry.items) {
            const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
            const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;
            // console.log(initialOpenState, 'initialOpenStateinitialOpenState')
            // console.log(itemsMatchIndex, 'itemsMatchIndexitemsMatchIndex')

            return (
              <Accordion
                key={entry.label}
                isPushed={isPushed}
                pushNav={pushNav}
                icon={iconElement}
                label={entry.label}
                initialOpenState={initialOpenState}
                className={calloutClass}
                // isActive={entry.items.some((item) => item.href === location.pathname)}
              >
                {isPushed &&
                  entry.items.map((item) => (
                    <MenuEntry
                      key={item.href}
                      secondary
                      isActive={item.href === location.pathname}
                      onClick={handleClick}
                    >
                      <MenuLink to={item.href} {...item} prefetch={false}>
                        <LinkLabel isActive={item.href === location.pathname}>
                          <span style={{ fontSize: "24px", marginRight: "5px" }}>·</span>
                          {t(`${item.label}`)}
                        </LinkLabel>
                      </MenuLink>
                    </MenuEntry>
                  ))}
              </Accordion>
            );
          }
          return (
            <MenuEntry
              key={entry.label}
              isActive={entry.href === location.pathname}
              className={calloutClass}
              onClick={handleClick}
            >
              <MenuLink to={entry.href} {...entry} prefetch={false}>
                {iconElement}
                <LinkLabel isActive={entry.href === location.pathname}>{t(`${entry.label}`)}</LinkLabel>
              </MenuLink>
            </MenuEntry>
          );
        })}
      </div>
      <PanelFooter isDark={false} links={links} isPushed={isPushed} pushNav={pushNav} />
    </Container>
  );
};

export default PanelBody;
