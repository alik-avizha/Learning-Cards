import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M19.5 14.5a1 1 0 0 1-1.6.8l-5.4-4.5-5.3 4.3a1 1 0 0 1-1.4-.1 1 1 0 0 1 .1-1.5l6-4.8a1 1 0 0 1 1.3 0l6 5a1 1 0 0 1 .3.8Z"
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

export const ArrowUp = memo(ForwardRef)
