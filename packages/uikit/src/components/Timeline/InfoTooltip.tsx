import useTooltip from "@inscription/uikit/src/hooks/useTooltip/useTooltip";
import { BoxProps, Flex } from "@inscription/uikit/src/components/Box";
import { InfoIcon } from "@inscription/uikit/src/components/Svg";

type InfoTooltip = {
  text: string;
  iconColor?: string;
} & BoxProps;

const InfoTooltip: React.FC<React.PropsWithChildren<InfoTooltip>> = ({ text, iconColor = "textSubtle", ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, {});
  return (
    <Flex {...props} alignItems="center">
      {tooltipVisible && tooltip}
      <Flex ref={targetRef} alignItems="center">
        <InfoIcon color={iconColor} />
      </Flex>
    </Flex>
  );
};

export default InfoTooltip;
