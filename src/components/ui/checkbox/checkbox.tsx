import { FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

import { Typography } from '@/components/ui'

export type CheckBoxProps = {
  onChange?: (checked: boolean) => void
  disabled?: boolean
  checked?: boolean
  variant: 'default' | 'withText'
  checkBoxText?: string
}

export const CheckboxDemo: FC<CheckBoxProps> = ({
  disabled = false,
  onChange,
  checked,
  checkBoxText,
}) => {
  return (
    <div className={s.checkBoxBlock}>
      <Checkbox.Root
        className={`${s.checkboxRoot} ${checked ? s.active : s.unActive}`}
        id="c1"
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon className={s.icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {checkBoxText && (
        <label className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor="c1">
          <Typography variant={'body2'}>{checkBoxText}</Typography>
        </label>
      )}
    </div>
  )
}
