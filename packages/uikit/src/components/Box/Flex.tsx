import styled from "styled-components";
import { flexbox } from "styled-system";
import Box from "@inscription/uikit/src/components/Box/Box";
import { FlexProps } from "@inscription/uikit/src/components/Box/types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export default Flex;
