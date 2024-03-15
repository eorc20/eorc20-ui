import React from "react";
import Link from "@inscription/uikit/src/components/Link/Link";
import { LinkProps } from "@inscription/uikit/src/components/Link/types";
import OpenNewIcon from "@inscription/uikit/src/components/Svg/Icons/OpenNew";

const LinkExternal: React.FC<React.PropsWithChildren<LinkProps>> = ({
  iconShow = false,
  children,
  showIcon = true,
  ...props
}) => {
  return (
    <Link external {...props}>
      {iconShow ? <img src="/images/start/icon6.png" width={18} alt="" style={{ marginRight: "6px" }} /> : <></>}
      {children}
      {showIcon ? <OpenNewIcon color={props.color ? props.color : "primary"} ml="4px" /> : <></>}
    </Link>
  );
};

export default LinkExternal;
