import * as React from "react";
import type { SVGProps } from "react";
const SvgBallTennis = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      d="M11.335 1.596a.75.75 0 0 1 .691.804c-.018.24-.026.375-.026.6a9 9 0 0 0 9 9c.217 0 .345-.008.575-.024a.75.75 0 0 1 .109 1.496A8 8 0 0 1 21 13.5c-5.8 0-10.5-4.7-10.5-10.5 0-.278.01-.454.03-.713a.75.75 0 0 1 .805-.691M12.545 22.498a.75.75 0 0 1-.691-.804c.018-.24.026-.375.026-.6a9 9 0 0 0-9-9c-.218 0-.345.007-.576.024a.75.75 0 0 1-.108-1.496 8 8 0 0 1 .684-.028c5.799 0 10.5 4.7 10.5 10.5 0 .278-.011.454-.03.712a.75.75 0 0 1-.805.692"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgBallTennis;
