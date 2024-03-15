import { StyledAnimatedIconComponent, StyledIconContainer } from "@inscription/uikit/src/components/Svg/styles";
import { IconComponentType } from "@inscription/uikit/src/components/Svg/types";

const AnimatedIconComponent: React.FC<React.PropsWithChildren<IconComponentType>> = ({
  icon,
  fillIcon,
  color = "textSubtle",
  activeColor = "secondary",
  activeBackgroundColor,
  isActive = false,
  ...props
}) => {
  const IconElement = icon;
  const IconElementFill = fillIcon;
  return IconElement ? (
    <StyledAnimatedIconComponent isActive={isActive} hasFillIcon={!!IconElementFill} {...props}>
      <StyledIconContainer activeBackgroundColor={activeBackgroundColor}>
        <IconElement color={color} />
      </StyledIconContainer>
      {!!IconElementFill && (
        <StyledIconContainer activeBackgroundColor={activeBackgroundColor} {...props}>
          <IconElementFill color={activeColor} />
        </StyledIconContainer>
      )}
    </StyledAnimatedIconComponent>
  ) : null;
};

export default AnimatedIconComponent;
