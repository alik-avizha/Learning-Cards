import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <circle cx={12} cy={12} r={8.5} stroke="#fff" />
    <g fill="#fff" clipPath="url(#a)">
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M6 6h12v12H6z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const SubMenu = memo(ForwardRef)
