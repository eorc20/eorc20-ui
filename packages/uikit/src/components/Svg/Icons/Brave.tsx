import React from "react";
import Svg from "@inscription/uikit/src/components/Svg/Svg";
import { SvgProps } from "@inscription/uikit/src/components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="-100 -100 2970 2970" xmlns="http://www.w3.org/2000/svg" {...props}>
      <linearGradient id="a" y1="51%" y2="51%">
        <stop offset={0.4} stopColor="#f50" />
        <stop offset={0.6} stopColor="#ff2000" />
      </linearGradient>
      <linearGradient id="b" x1="2%" y1="51%" y2="51%">
        <stop offset={0} stopColor="#ff452a" />
        <stop offset={1} stopColor="#ff2000" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M2395 723l60-147-170-176c-92-92-288-38-288-38l-222-252H992L769 363s-196-53-288 37L311 575l60 147-75 218 250 953c52 204 87 283 234 387l457 310c44 27 98 74 147 74s103-47 147-74l457-310c147-104 182-183 234-387l250-953z"
      />
      <path
        fill="#fff"
        d="M1935 524s287 347 287 420c0 75-36 94-72 133l-215 230c-20 20-63 54-38 113 25 60 60 134 20 210-40 77-110 128-155 120a820 820 0 01-190-90c-38-25-160-126-160-165s126-110 150-124c23-16 130-78 132-102s2-30-30-90-88-140-80-192c10-52 100-80 167-105l207-78c16-8 12-15-36-20-48-4-183-22-244-5s-163 43-173 57c-8 14-16 14-7 62l58 315c4 40 12 67-30 77-44 10-117 27-142 27s-99-17-142-27-35-37-30-77c4-40 48-268 57-315 10-48 1-48-7-62-10-14-113-40-174-57-60-17-196 1-244 6-48 4-52 10-36 20l207 77c66 25 158 53 167 105 10 53-47 132-80 192s-32 66-30 90 110 86 132 102c24 15 150 85 150 124s-119 140-159 165a820 820 0 01-190 90c-45 8-115-43-156-120-40-76-4-150 20-210 25-60-17-92-38-113l-215-230c-35-37-71-57-71-131s287-420 287-420l273 44c32 0 103-27 168-50 65-20 110-22 110-22s44 0 110 22 136 50 168 50c33 0 275-47 275-47zm-215 1328c18 10 7 32-10 44l-254 198c-20 20-52 50-73 50s-52-30-73-50a13200 13200 0 00-255-198c-16-12-27-33-10-44l150-80a870 870 0 01188-73c15 0 110 34 187 73l150 80z"
      />
      <path
        fill="url(#b)"
        d="M1999 363l-224-253H992L769 363s-196-53-288 37c0 0 260-23 350 123l276 47c32 0 103-27 168-50 65-20 110-22 110-22s44 0 110 22 136 50 168 50c33 0 275-47 275-47 90-146 350-123 350-123-92-92-288-38-288-38"
      />
    </Svg>
  );
};

export default Icon;
