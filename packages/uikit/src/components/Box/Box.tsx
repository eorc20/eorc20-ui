import { m as motion } from "framer-motion";
import styled from "styled-components";
import { background, border, layout, position, space, color } from "styled-system";
import { BoxProps } from "@inscription/uikit/src/components/Box/types";

export const MotionBox = styled(motion.div)<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  ${color}
`;

export default Box;
