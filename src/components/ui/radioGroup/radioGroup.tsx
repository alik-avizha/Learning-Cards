import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { Typography } from '../typography'

import s from './radioGroup.module.scss'

type RadioGroupProps = {
  classname?: string
  options?: any[]
  onChangeOption?: (option: any) => void
  isDisabled?: boolean
}
export const RadioGroupDemo: FC<RadioGroupProps> = ({
  isDisabled = false,
  options,
  onChangeOption,
}) => {
  return (
    <form>
      <RadioGroup.Root className={s.radioGroupRoot} onValueChange={onChangeOption}>
        {options?.map(o => {
          return (
            <div className={s.itemGroup} key={o.id}>
              <RadioGroup.Item
                className={s.radioGroupItem}
                disabled={isDisabled}
                value={o.id}
                id={o.id}
              >
                <RadioGroup.Indicator className={s.radioGroupIndicator} />
              </RadioGroup.Item>
              <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor={o.id}>
                <Typography variant={'body2'}>{o.value}</Typography>
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </form>
  )
}
