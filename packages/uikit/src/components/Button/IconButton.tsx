import styled from "styled-components";
import { PolymorphicComponent } from "@inscription/uikit/src/util/polymorphic";
import Button from "@inscription/uikit/src/components/Button/Button";
import { BaseButtonProps } from "@inscription/uikit/src/components/Button/types";

const IconButton: PolymorphicComponent<BaseButtonProps, "button"> = styled(Button)<BaseButtonProps>`
  padding: 0;
  width: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};
  // border: 1px solid red;
  display: flex;
  justify-content: end;
`;

export default IconButton;
