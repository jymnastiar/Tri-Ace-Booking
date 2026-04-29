import * as React from "react";
import type { SVGProps } from "react";
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#0EA5E9"
      d="M20 12c0-1.81-3.76-3.985-8.007-4C7.775 7.985 4 10.178 4 12c0 1.825 3.754 4.006 7.997 4C16.252 15.994 20 13.82 20 12m-8 6c-5.042.007-10-2.686-10-6s4.984-6.017 10-6 10 2.686 10 6-4.958 5.993-10 6m0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
    />
  </svg>
);
export default SvgEye;
