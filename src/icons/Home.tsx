import * as React from "react";
import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#0EA5E9"
      d="M20 20V9.132l-8-4.8-8 4.8V20h4v-2.75a4 4 0 1 1 8 0V20zm-6 2v-4.75a2 2 0 1 0-4 0V22H4a2 2 0 0 1-2-2V9.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 22 9.132V20a2 2 0 0 1-2 2z"
    />
  </svg>
);
export default SvgHome;
