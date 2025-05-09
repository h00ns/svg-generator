import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";

const left = (
  {
    size = 24,
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string;
  },
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="&#235;&#176;&#169;&#237;&#150;&#165;=Left">
      <mask
        id="mask0_537_6706"
        style="maskType:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_537_6706)">
        <path
          id="arrow_downward_alt"
          d="M9.09999 10.975L17.3 10.975C17.5833 10.975 17.8208 11.0709 18.0125 11.2625C18.2042 11.4542 18.3 11.6917 18.3 11.975C18.3 12.2584 18.2042 12.4959 18.0125 12.6875C17.8208 12.8792 17.5833 12.975 17.3 12.975L9.09999 12.975L12 15.875C12.1833 16.0584 12.275 16.2917 12.275 16.575C12.275 16.8584 12.1833 17.0917 12 17.275C11.8167 17.4584 11.5833 17.55 11.3 17.55C11.0167 17.55 10.7833 17.4584 10.6 17.275L5.99999 12.675C5.79999 12.475 5.69999 12.2417 5.69999 11.975C5.69999 11.7084 5.79999 11.475 5.99999 11.275L10.6 6.67502C10.7833 6.49169 11.0167 6.40002 11.3 6.40002C11.5833 6.40002 11.8167 6.49169 12 6.67502C12.1833 6.85836 12.275 7.09169 12.275 7.37502C12.275 7.65836 12.1833 7.89169 12 8.07502L9.09999 10.975Z"
          fill="#171719"
        />
      </g>
    </g>
  </svg>
);

const ForwardRef = forwardRef(left);
export default ForwardRef;
