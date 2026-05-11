import * as React from "react";
import type { SVGProps } from "react";

const Filter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    {...props}
  >
    <path d="M3 6h18M6 12h12M9 18h6" />
  </svg>
);

export default Filter;