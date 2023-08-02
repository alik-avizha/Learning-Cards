import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g fill="#fff">
      <path d="M8 1.3a6.7 6.7 0 1 0 0 13.4A6.7 6.7 0 0 0 8 1.3Zm0 12A5.3 5.3 0 1 1 8 2.7a5.3 5.3 0 0 1 0 10.6Z" />
      <path d="M8.2 5A1.1 1.1 0 0 0 7 4.8a1 1 0 0 0-.7 1v4.4a1 1 0 0 0 .7 1l.5.1c.2 0 .5 0 .7-.3l2.5-2.2a1 1 0 0 0 0-1.6L8.2 5Zm-.5 4.7V6.3L9.5 8 7.7 9.7Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Play = memo(ForwardRef)
