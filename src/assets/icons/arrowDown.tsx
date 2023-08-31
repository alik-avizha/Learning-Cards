import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <g>
      <path
        fill="#fff"
        d="M5.5 9.5a1 1 0 0 1 1.7-.8l5.3 4.5L18 8.8a1 1 0 0 1 1.4.2 1 1 0 0 1-.2 1.5l-6 4.8a1 1 0 0 1-1.2 0l-6-5a1 1 0 0 1-.4-.8Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ArrowDown = memo(ForwardRef)
