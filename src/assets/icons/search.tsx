import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
    <path
      fill={props.fill}
      d="m17.258 16.075-2.833-2.825a6.6 6.6 0 0 0 1.408-4.083 6.667 6.667 0 0 0-4.115-6.16A6.667 6.667 0 0 0 5.463 14.71a6.667 6.667 0 0 0 3.704 1.123 6.6 6.6 0 0 0 4.083-1.408l2.825 2.833a.833.833 0 0 0 1.183 0 .832.832 0 0 0 .247-.591.833.833 0 0 0-.247-.592ZM4.167 9.167a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Search = memo(ForwardRef)
