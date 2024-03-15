import React from "react";
import StyledProgress, { Bar } from "@inscription/uikit/src/components/Progress/StyledProgress";
import ProgressBunnyWrapper from "@inscription/uikit/src/components/Progress/ProgressBunnyWrapper";
import { ProgressBunny } from "@inscription/uikit/src/components/Svg";
import { ProgressProps, variants, scales } from "@inscription/uikit/src/components/Progress/types";

const stepGuard = (step: number) => {
  if (step < 0) {
    return 0;
  }

  if (step > 100) {
    return 100;
  }

  return step;
};

const Progress: React.FC<React.PropsWithChildren<ProgressProps>> = ({
  variant = variants.ROUND,
  scale = scales.MD,
  primaryStep = 0,
  secondaryStep = null,
  showProgressBunny = false,
  useDark = true,
  children,
}) => {
  return (
    <StyledProgress $useDark={useDark} variant={variant} scale={scale}>
      {children || (
        <>
          {showProgressBunny && (
            <ProgressBunnyWrapper style={{ left: `${stepGuard(primaryStep)}%` }}>
              <ProgressBunny />
            </ProgressBunnyWrapper>
          )}
          <Bar $useDark={useDark} primary style={{ width: `${stepGuard(primaryStep)}%` }} />
          {secondaryStep ? <Bar $useDark={useDark} style={{ width: `${stepGuard(secondaryStep)}%` }} /> : null}
        </>
      )}
    </StyledProgress>
  );
};

export default Progress;
