import styled from "styled-components";
import { grid, flexbox } from "styled-system";
import Box from "@inscription/uikit/src/components/Box/Box";
import { GridProps } from "@inscription/uikit/src/components/Box/types";

const Grid = styled(Box)<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`;

export default Grid;
