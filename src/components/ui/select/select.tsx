import { FC } from 'react'

import { Listbox } from '@headlessui/react'

import { SelectArrow } from '../../../assets'
import { Typography } from '../typography'

import s from './select.module.scss'

type PropsType = {
  options?: any[]
  onChangeOption?: (option: any) => void
  className?: string
  isDisabled?: boolean
  value: any
}

export const SelectDemo: FC<PropsType> = ({
  className,
  isDisabled,
  onChangeOption,
  options,
  value,
}) => {
  return (
    <Listbox disabled={isDisabled} value={value} onChange={onChangeOption}>
      <div className={`${s.listBox} ${className}`}>
        <Listbox.Button className={isDisabled ? s.disabledTrigger : s.trigger}>
          <Typography variant={'body1'}>{value.value}</Typography>
          <SelectArrow className={isDisabled ? s.disabledArrow : s.arrow} />
        </Listbox.Button>
        <Listbox.Options className={s.optionList}>
          {options?.map(o => (
            <Listbox.Option className={s.list} key={o.id} value={o}>
              {({ disabled }) => (
                <Typography className={`${disabled ? s.listItemDisabled : s.listItem}`}>
                  {o.value}
                </Typography>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
