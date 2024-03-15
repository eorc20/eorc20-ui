/* eslint-disable import/no-extraneous-dependencies */
import capitalize from "lodash/capitalize";
import React, { useState } from "react";
import styled from "styled-components";
import Box from "../Box/Box";
import Flex from "../Box/Flex";
import Button from "./Button";
import { scales, variants } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

const Row = styled(Flex)`
  margin-bottom: 32px;
  & > button + button,
  & > a + a {
    margin-left: 16px;
  }
`;

export const Default: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button mr="8px" disabled>
          Disabled
        </Button>
        <Button variant="secondary" mr="8px" disabled>
          Disabled
        </Button>
        <Button disabled p="0 45px" decorator={{ text: "Soon" }}>
          Locked
        </Button>
      </Box>
    </>
  );
};
