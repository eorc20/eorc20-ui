import React from "react";
import Svg from "@inscription/uikit/src/components/Svg/Svg";
import { SvgProps } from "@inscription/uikit/src/components/Svg/types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 23 21" {...props}>
    <path
      d="M17.553 3.091v.001c0 .55.19 1.081.541 1.502l-3.68 7.364a2.346 2.346 0 00-.827.108L10.833 8.97c.14-.3.217-.63.22-.967h0v-.003a2.35 2.35 0 00-2.35-2.35 2.35 2.35 0 00-2.35 2.35V8c.004.499.165.984.465 1.384l-3.477 6.082A2.35 2.35 0 00.75 17.803a2.35 2.35 0 002.35 2.35 2.35 2.35 0 002.35-2.35V17.8a2.338 2.338 0 00-.464-1.384l3.472-6.081c.322.037.65.004.957-.098l2.751 3.096a2.38 2.38 0 00-.216.967v.002a2.352 2.352 0 002.34 2.36 2.352 2.352 0 002.36-2.342v0c0-.55-.19-1.086-.54-1.51l3.68-7.365A2.35 2.35 0 0022.25 3.1a2.347 2.347 0 00-4.697-.01z"
      stroke="currentColor"
      strokeWidth={0.5}
    />
  </Svg>
);

export default Icon;
