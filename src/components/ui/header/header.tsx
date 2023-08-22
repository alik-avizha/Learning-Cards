import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './header.module.scss'

import { Logo, Logout, Profile } from '@/assets'
import { useMutationWithToast } from '@/common'
import { Button, DropDownMenuDemo, Typography } from '@/components/ui'
import { AvatarDemo } from '@/components/ui/avatar'
import { ProfileBlock } from '@/components/ui/header/profile-block'
import { ResponseUserType, useLogoutMutation } from '@/services/auth'

type HeaderProps = {
  data?: ResponseUserType | null
}
export const Header: FC<HeaderProps> = ({ data }) => {
  const [logout] = useLogoutMutation()
  const hookWithToast = useMutationWithToast()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    if (!navigator.onLine) {
      toast.error("Can't perform logout while offline")

      return
    }
    const result = await hookWithToast(logout(), 'Всего хорошего')

    if (result?.success) {
      navigate('/login')
    }
  }

  const dropDownMenu = [
    { id: 1, component: <ProfileBlock data={data} /> },
    {
      id: 2,
      component: (
        <Button as={Link} to={'/profile'} variant={'link'} className={s.buttonDrop}>
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
            <Link to={`/profile`} className={s.link}>
              <Typography variant={'subtitle1'} className={s.menu_name}>
                {data.name}
              </Typography>
            </Link>
            <DropDownMenuDemo
              items={dropDownMenu}
              trigger={<AvatarDemo src={data.avatar} name={data.name} />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
