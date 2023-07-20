import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
    <g fill={props.fill} clipPath="url(#a)">
      <path d="M18.225 9.583c-.533-.925-3.467-5.566-8.45-5.416-4.608.116-7.275 4.166-8 5.416a.833.833 0 0 0 0 .834c.525.908 3.333 5.416 8.242 5.416h.208c4.608-.116 7.283-4.166 8-5.416a.834.834 0 0 0 0-.834Zm-8.042 4.584C6.592 14.25 4.25 11.175 3.517 10c.833-1.342 3.008-4.083 6.341-4.167 3.575-.091 5.925 2.992 6.667 4.167-.858 1.342-3.008 4.083-6.342 4.167Z" />
      <path d="M10 7.083a2.917 2.917 0 1 0 0 5.834 2.917 2.917 0 0 0 0-5.834Zm0 4.167a1.25 1.25 0 0 1-1.155-.772A1.25 1.25 0 1 1 10 11.25Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.fill} d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Eye = memo(ForwardRef)
