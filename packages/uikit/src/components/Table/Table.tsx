import styled from "styled-components";
import { space } from "styled-system";
import { Td } from "@inscription/uikit/src/components/Table/Cell";

const Table = styled.table`
  max-width: 100%;
  width: 100%;

  tbody tr:last-child {
    ${Td} {
      border-bottom: 0;
    }
  }

  ${space}
`;

export default Table;
