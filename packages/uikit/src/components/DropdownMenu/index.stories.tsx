import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import { Box } from "../Box";
import DropdownMenu from "./DropdownMenu";
import ItemsMock from "./mock";

export default {
  title: "Components/Menu/DropdownMenu",
  component: DropdownMenu,
};

export const Default: React.FC<React.PropsWithChildren> = () => {
  return (
    <BrowserRouter>
      <Box width="300px">
        <DropdownMenu items={ItemsMock} activeItem="/">
          Wallet
        </DropdownMenu>
      </Box>
    </BrowserRouter>
  );
};
