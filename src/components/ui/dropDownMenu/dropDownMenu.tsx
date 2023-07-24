import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar, Logout, Profile } from '../../../assets/icons'
import { Typography } from '../typography'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = {
  trigger?: ReactNode
}

export const DropDownMenuDemo: FC<DropDownMenuPropsType> = () => {
  return (
    <DropdownMenu.Root>
      <div className={s.dropDownBlock}>
        <DropdownMenu.Trigger asChild>
          <button className={s.iconButton} aria-label="Customise options">
            <Avatar />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.dropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>
              <div className={s.dropdownMenuItemInfo}>
                <Avatar />
                <div className={s.info}>
                  <Typography variant={'subtitle2'}>Name</Typography>
                  <Typography variant={'caption'} className={s.email}>
                    egor.belozerov@mail.ru
                  </Typography>
                </div>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            <DropdownMenu.Item className={s.dropdownMenuItem}>
              <div className={s.dropdownMenuItemContent}>
                <Profile />
                <Typography variant={'caption'}>My Profile</Typography>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            <DropdownMenu.Item className={s.dropdownMenuItem}>
              <div className={s.dropdownMenuItemContent}>
                <Logout />
                <Typography variant={'caption'}>Sign out</Typography>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className={s.arrowBox} asChild>
              <div className={s.arrow} />
            </DropdownMenu.Arrow>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  )
}
