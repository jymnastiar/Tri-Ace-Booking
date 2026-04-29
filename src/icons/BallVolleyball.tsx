import * as React from "react";
import type { SVGProps } from "react";
const SvgBallVolleyball = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g
      stroke="#0EA5E9"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#ball-volleyball_svg__a)"
    >
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18" />
      <path d="M7.5 13.5A12 12 0 0 0 16 20m-4-8a8 8 0 0 0 8 4z" />
      <path d="M12.951 7.353a12 12 0 0 0-9.88 4.111M12 12a8 8 0 0 0-7.464 4.928z" />
      <path d="M15.549 15.147a12 12 0 0 0 1.38-10.611M12 12a8 8 0 0 0-.536-8.928z" />
    </g>
    <defs>
      <clipPath id="ball-volleyball_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBallVolleyball;
