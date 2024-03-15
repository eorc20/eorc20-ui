import React from "react";
import { PublicStack, PublicInput, PublicLabel } from "@inscription/uikit/src/components/InscriptionToggle/StyledPublicToggle";
import { PublicToggleProps, scales } from "@inscription/uikit/src/components/InscriptionToggle/types";

const InscriptionToggle: React.FC<React.PropsWithChildren<PublicToggleProps>> = ({ checked, scale = scales.LG, ...props }) => (
  <PublicStack scale={scale}>
    <PublicInput id={props.id || "inscription-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <PublicLabel scale={scale} checked={checked} htmlFor={props.id || "inscription-toggle"}>
      <div className="publics">
        <div className="public" />
        <div className="public" />
        <div className="public" />
        <div className="butter" />
      </div>
    </PublicLabel>
  </PublicStack>
);

export default InscriptionToggle;
