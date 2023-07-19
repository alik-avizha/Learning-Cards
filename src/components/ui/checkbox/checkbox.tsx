import { FC, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

type CheckBoxProps = {
  isDisabled?: boolean
  isChecked?: boolean
  variant: 'default' | 'withText'
  checkBoxText?: string
}

export const CheckboxDemo: FC<CheckBoxProps> = ({
  isDisabled = false,
  isChecked,
  checkBoxText,
}) => {
  const [check, setCheck] = useState<boolean | undefined>(isChecked)

  return (
    <div className={s.checkBoxBlock}>
      <Checkbox.Root
        onClick={() => setCheck(!check)}
        className={`${s.checkboxRoot} ${check ? s.active : s.unActive}`}
        id="c1"
        checked={check}
        disabled={isDisabled}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {checkBoxText && (
        <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor="c1">
          <Typography variant={'body2'}>{checkBoxText}</Typography>
        </label>
      )}
    </div>
  )
}
