import { Meta } from '@storybook/react'

import { Avatar, Edit, Logout, Play, Profile, SubMenu, Trash } from '../../../assets'
import s from '../../page/friends-pack/friends-pack.module.scss'
import { Button } from '../button'
import { ProfileBlock } from '../header/profile-block'
import { Typography } from '../typography'

import { DropDownMenuDemo } from './dropDownMenu.tsx'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenuDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenuDemo>

export default meta

export const DropdownMenuFirstVariant = () => {
  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Trash />
          <Typography variant={'caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  return <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
}
export const DropdownMenuSecondVariant = () => {
  const dropDownMenu = [
    { id: 1, component: <ProfileBlock /> },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Profile />
          <Typography variant={'caption'}>My Profile</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Logout />
          <Typography variant={'caption'}>Sign Out</Typography>
        </Button>
      ),
    },
  ]

  return <DropDownMenuDemo items={dropDownMenu} trigger={<Avatar />} />
}
