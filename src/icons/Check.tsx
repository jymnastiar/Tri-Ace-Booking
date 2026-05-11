import * as React from "react";
import type { SVGProps } from "react";

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 6l3 3 5-5" />
  </svg>
);

export default Check;
