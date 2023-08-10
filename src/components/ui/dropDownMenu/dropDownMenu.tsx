import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = {
  trigger?: ReactNode
  items?: {
    id: number
    component: JSX.Element
  }[]
}

export const DropDownMenuDemo: FC<DropDownMenuPropsType> = ({ items, trigger }) => {
  const itemsForRender = items?.map((item, index) => {
    return (
      <div key={index}>
        {index === items?.length - 1 ? (
          <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
        ) : (
          <>
            <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
          </>
        )}
      </div>
    )
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.iconButton} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.dropdownMenuContent} sideOffset={5}>
          {itemsForRender}
          <DropdownMenu.Arrow className={s.arrowBox} asChild>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
