import { FC, ReactNode } from 'react'

import * as Label from '@radix-ui/react-label'
import * as Select from '@radix-ui/react-select'

import { SelectArrow } from '../../../assets'
import { Typography } from '../typography'

import s from './select.module.scss'

export type SelectPropsType = {
  label?: string
  placeholder?: ReactNode
  value?: string
  onValueChange?: (value: any) => void
  defaultValue?: any
  options: any[]
  disabled?: boolean
  required?: boolean
  classname?: string
}

export const SuperSelect: FC<SelectPropsType> = ({
  label,
  placeholder,
  value,
  onValueChange,
  defaultValue,
  options,
  disabled,
  required,
  classname,
}) => (
  <Label.Root>
    <Typography
      variant={'body2'}
      as={'label'}
      className={`${s.label} ${disabled && s.labelDisabled}`}
    >
      {label}
    </Typography>
    <Select.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
    >
      <Select.Trigger
        className={`${disabled ? s.triggerDisabled : s.trigger} ${classname}`}
        asChild
        tabIndex={1}
      >
        <div>
          <Select.Value placeholder={placeholder} />
          <SelectArrow className={disabled ? s.iconDisabled : s.icon} />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position={'popper'} className={s.content} sideOffset={-1}>
          <Select.Viewport>
            {options.map(el => (
              <Select.Item key={el.value} value={el.value} className={s.item}>
                <Select.ItemText>{el.value}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </Label.Root>
)
