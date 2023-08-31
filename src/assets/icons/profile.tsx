import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g fill="#fff">
      <path d="M8 7.334a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Zm0-4a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm0 5.333a4.667 4.667 0 0 0-4.667 4.667.667.667 0 1 0 1.334 0 3.333 3.333 0 0 1 6.666 0 .667.667 0 0 0 1.334 0A4.667 4.667 0 0 0 8 8.667Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .001h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Profile = memo(ForwardRef)
