import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Logo, Logout, Profile } from '../../../assets'
import { ResponseUserType, useLogoutMutation } from '../../../services/auth'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { DropDownMenuDemo } from '../dropDownMenu'
import { Typography } from '../typography'

import s from './header.module.scss'
import { ProfileBlock } from './profile-block'

type HeaderProps = {
  data?: ResponseUserType
}
export const Header: FC<HeaderProps> = ({ data }) => {
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()
  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  const dropDownMenu = [
    { id: 1, component: <ProfileBlock data={data} /> },
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
        <Button variant={'link'} className={s.buttonDrop} onClick={logoutHandler}>
          <Logout />
          <Typography variant={'caption'}>Sign Out</Typography>
        </Button>
      ),
    },
  ]

  return (
    <div className={s.headerBlock}>
      <div className={s.contentHeader}>
        <Button as={Link} to="/" variant={'link'} className={s.logo}>
          <Logo />
        </Button>
        {!data && <Button variant={'primary'}>Sign In</Button>}
        {data && (
          <div className={s.avatar_menu}>
            <Typography variant={'subtitle1'} className={s.menu_name}>
              {data.name}
            </Typography>
            <DropDownMenuDemo items={dropDownMenu} trigger={<Avatar src={data.avatar} />} />
          </div>
        )}
      </div>
    </div>
  )
}
