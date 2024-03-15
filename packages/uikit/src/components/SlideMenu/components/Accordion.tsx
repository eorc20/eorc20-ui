import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "@inscription/localization";
import { MENU_ENTRY_HEIGHT } from "@inscription/uikit/src/components/SlideMenu/config";
import { LinkLabel, MenuEntry } from "@inscription/uikit/src/components/SlideMenu/components/MenuEntry";
import { PushedProps } from "@inscription/uikit/src/components/SlideMenu/types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "@inscription/uikit/src/components/Svg";

interface Props extends PushedProps {
  label: string;
  icon: React.ReactElement;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  border-style: solid;
  border-width: 1px 0;
`;

const Accordion: React.FC<Props> = ({
  label,
  icon,
  isPushed,
  pushNav,
  initialOpenState = true,
  children,
  className,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };
  console.log(isOpen, "isOpenisOpen");

  return (
    <Container>
      <MenuEntry onClick={handleClick} className={className} isActive={isActive}>
        {icon}
        <LinkLabel isActive={isActive}>{t(`${label}`)}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent isOpen={isOpen} isPushed={isPushed} maxHeight={React.Children.count(children) * 70}>
        {children}
      </AccordionContent>
    </Container>
  );
};

// export default React.memo(Accordion, (prev, next) => prev.isPushed === next.isPushed);
export default Accordion;
