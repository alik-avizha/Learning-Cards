import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './header.module.scss'

import { Logout, Profile } from '@/assets'
import { useMutationWithToast } from '@/common'
import { Button, DropDownMenuDemo, Typography } from '@/components/ui'
import { AvatarDemo } from '@/components/ui/avatar'
import { ProfileBlock } from '@/components/ui/header/profile-block'
import { LanguageTheme } from '@/components/ui/language-theme/language-theme.tsx'
import { ResponseUserType, useLogoutMutation } from '@/services/auth'

type HeaderProps = {
  data?: ResponseUserType | null
}
export const Header: FC<HeaderProps> = ({ data }) => {
  const [logout] = useLogoutMutation()
  const hookWithToast = useMutationWithToast()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const logoutHandler = async () => {
    if (!navigator.onLine) {
      toast.error(t('header-drop-down.toast-error'))

      return
    }
    const result = await hookWithToast(logout(), t('header-drop-down.toast'))

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
          <Typography variant={'caption'}>{t('header-drop-down.myProfile')}</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={logoutHandler}>
          <Logout />
          <Typography variant={'caption'}>{t('header-drop-down.signOut')}</Typography>
        </Button>
      ),
    },
  ]

  return (
    <div className={s.headerBlock}>
      <div className={s.contentHeader}>
        <div className={s.logoBlock}>
          <Button aria-label={'to-main-page'} as={Link} to="/" variant={'link'} className={s.logo}>
            <Typography variant={'large'}>{t('learning-cards')}</Typography>
          </Button>
          <LanguageTheme />
        </div>
        {!data && <Button variant={'primary'}>{t('header-drop-down.signIn')}</Button>}
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
