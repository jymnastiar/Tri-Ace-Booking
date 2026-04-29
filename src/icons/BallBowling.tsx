import * as React from "react";
import type { SVGProps } from "react";
const SvgBallBowling = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#0EA5E9"
      fillRule="evenodd"
      d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12"
      clipRule="evenodd"
    />
    <path
      fill="#0EA5E9"
      d="M13.5 10.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M13.875 7.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M16.875 9a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25"
    />
  </svg>
);
export default SvgBallBowling;
