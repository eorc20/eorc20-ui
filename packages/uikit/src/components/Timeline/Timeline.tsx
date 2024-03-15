import { Colors, lightColors } from "@inscription/uikit/src/theme";
import { Flex } from "@inscription/uikit/src/components/Box";
import { CircleOutlineIcon, LogoIcon, CheckmarkCircleFillIcon } from "@inscription/uikit/src/components/Svg";
import { Text } from "@inscription/uikit/src/components/Text";
import InfoTooltip from "@inscription/uikit/src/components/Timeline/InfoTooltip";
import { TimelineContainer, TimelineEvent } from "@inscription/uikit/src/components/Timeline/styles";
import { TimelineProps, EventStatus } from "@inscription/uikit/src/components/Timeline/types";

type getTextColorProps = {
  eventStatus: EventStatus;
  useDark: boolean;
};

const getTextColor = ({ eventStatus, useDark }: getTextColorProps): keyof Colors => {
  if (eventStatus === "upcoming") return useDark ? "textDisabled" : (lightColors.textDisabled as keyof Colors);
  if (eventStatus === "live") return "success";
  return useDark ? "textSubtle" : (lightColors.textSubtle as keyof Colors);
};

const Timeline: React.FC<React.PropsWithChildren<TimelineProps>> = ({ events, useDark = true }) => {
  return (
    <TimelineContainer>
      {events.map(({ text, status, altText, infoText }) => {
        const isUpcoming = status === "upcoming";
        const isLive = status === "live";
        const isPast = status === "past";
        return (
          <TimelineEvent key={text} $useDark={useDark}>
            <Flex mr="10px" alignItems="center">
              {isUpcoming && <CircleOutlineIcon color={useDark ? "textDisabled" : lightColors.textDisabled} />}
              {isLive && <LogoIcon />}
              {isPast && <CheckmarkCircleFillIcon color={useDark ? "textSubtle" : lightColors.textSubtle} />}
            </Flex>
            <Text color={getTextColor({ eventStatus: status, useDark })} bold>
              {text}
            </Text>
            {altText && (
              <Text color="warning" ml="2px" bold>
                {altText}
              </Text>
            )}
            {infoText && (
              <InfoTooltip text={infoText} ml="10px" iconColor={useDark ? "textSubtle" : lightColors.textSubtle} />
            )}
          </TimelineEvent>
        );
      })}
    </TimelineContainer>
  );
};

export default Timeline;
