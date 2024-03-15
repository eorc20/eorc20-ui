import React, { useState } from "react";
import InscriptionToggle from "./InscriptionToggle";

export default {
  title: "Components/InscriptionToggle",
  component: InscriptionToggle,
};

export const Default: React.FC<React.PropsWithChildren> = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <InscriptionToggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <InscriptionToggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div>
        <InscriptionToggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
