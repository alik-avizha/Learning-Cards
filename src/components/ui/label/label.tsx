import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as Label from '@radix-ui/react-label'

import s from './label.module.scss'

export type LabelProps = {
  variant?: 'primary' | 'secondary'
  label?: ReactNode
  disabled?: boolean
} & ComponentPropsWithoutRef<'label'>

export const LabelDemo: FC<LabelProps> = ({
  variant = 'primary',
  label,
  children,
  disabled,
  ...rest
}) => {
  return (
    <Label.Root {...rest}>
      {label && <div className={`${s.label} ${disabled ? s.disabled : s[variant]} `}>{label}</div>}
      {children}
    </Label.Root>
  )
}
