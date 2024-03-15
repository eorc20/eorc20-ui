import styled from "styled-components";
import BaseLayout from "@inscription/uikit/src/components/Layouts/BaseLayout";

const GridLayout = styled(BaseLayout)`
  & > div {
    grid-column: span 6;
    ${({ theme }) => theme.mediaQueries.sm} {
      grid-column: span 4;
    }
  }
`;

export default GridLayout;
