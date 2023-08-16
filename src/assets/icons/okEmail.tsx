import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={96} height={96} ref={ref} {...props}>
    <path fill="none" d="M-1-1h582v402H-1z" />
    <circle cx={48.25} cy={48} r={47} fill="none" stroke="#BEA6FF" strokeWidth={2} />
    <path fill="none" stroke="#BEA6FF" strokeWidth={2} d="m33 49.5 9 9L69.5 31" />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const OkEmail = memo(ForwardRef)
