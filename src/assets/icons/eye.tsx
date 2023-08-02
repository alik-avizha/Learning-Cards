import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <g fill={props.fill}>
      <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1ZM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5Z" />
      <path d="M12 8.5a3.5 3.5 0 0 0-2.475 5.975 3.5 3.5 0 0 0 1.792.958 3.5 3.5 0 0 0 3.593-1.488A3.5 3.5 0 0 0 12 8.5Zm0 5a1.5 1.5 0 0 1-1.386-.926A1.5 1.5 0 1 1 12 13.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.fill} d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Eye = memo(ForwardRef)
