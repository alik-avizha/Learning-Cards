import { FC, forwardRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'

import { Typography } from '../typography'

import s from './select.module.scss'

export const SelectDemo = () => {
  return (
    <Select.Root>
      <Select.Trigger className={s.selectTrigger}>
        <Select.Value placeholder="Select-box" />
        <Select.Icon className={s.selectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className={s.selectPortal}>
        <Select.Content className={s.selectContent}>
          {/*<Select.ScrollUpButton className={s.selectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>*/}
          <Select.Viewport className={s.selectViewport}>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </Select.Viewport>
          <Select.ScrollDownButton className={s.selectScrollButton}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

type SelectItemProps = {
  children: React.ReactNode
  value: string
}

const SelectItem: FC<SelectItemProps> = forwardRef<HTMLDivElement | null, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Item className={s.selectItem} {...props} ref={forwardedRef}>
        <Select.ItemText>
          <Typography variant={'body1'}>{children}</Typography>
        </Select.ItemText>
      </Select.Item>
    )
  }
)
