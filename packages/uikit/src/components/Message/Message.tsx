import React, { useContext } from "react";
import styled from "styled-components";
import { variant as systemVariant, space } from "styled-system";
import { WarningIcon, ErrorIcon, CheckmarkCircleFillIcon } from "@inscription/uikit/src/components/Svg";
import { Text, TextProps } from "@inscription/uikit/src/components/Text";
import { Box } from "@inscription/uikit/src/components/Box";
import { MessageProps } from "@inscription/uikit/src/components/Message/types";
import variants from "@inscription/uikit/src/components/Message/theme";

const MessageContext = React.createContext<MessageProps>({ variant: "success" });

const Icons = {
  warning: WarningIcon,
  danger: ErrorIcon,
  success: CheckmarkCircleFillIcon,
};

const MessageContainer = styled.div<MessageProps>`
  background-color: gray;
  padding: 16px;
  border-radius: 16px;
  border: solid 1px;
  width: 100%;

  ${space}
  ${systemVariant({
    variants,
  })}
`;

const Flex = styled.div`
  display: flex;
`;

const colors = {
  // these color names should be place in the theme once the palette is finalized
  warning: "#D67E0A",
  success: "#129E7D",
  danger: "failure",
};

export const MessageText: React.FC<React.PropsWithChildren<TextProps>> = ({ children, ...props }) => {
  const ctx = useContext(MessageContext);
  return (
    <Text fontSize="14px" color={colors[ctx?.variant]} {...props}>
      {children}
    </Text>
  );
};

const Message: React.FC<React.PropsWithChildren<MessageProps>> = ({
  children,
  variant,
  icon,
  action,
  actionInline,
  ...props
}) => {
  const Icon = Icons[variant];
  return (
    <MessageContext.Provider value={{ variant }}>
      <MessageContainer variant={variant} {...props}>
        <Flex>
          <Box mr="12px">{icon ?? <Icon color={variants[variant].borderColor} width="24px" />}</Box>
          {children}
          {actionInline && action}
        </Flex>
        {!actionInline && action}
      </MessageContainer>
    </MessageContext.Provider>
  );
};

export default Message;
