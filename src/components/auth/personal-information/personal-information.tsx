import { ChangeEvent, FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './personalInformation.module.scss'

import { Back, Edit, Logout } from '@/assets'
import { useMutationWithToast } from '@/common'
import { Button, Card, ControlledTextField, Typography } from '@/components/ui'
import { AvatarDemo } from '@/components/ui/avatar'
import {
  useLogoutMutation,
  useResendVerificationEmailMutation,
  useUpdateProfileMutation,
} from '@/services/auth'

const sigInSchema = z.object({
  name: z.string().trim().min(1),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  name?: string
  email?: string
  avatar?: string
  update: (value: string) => void
  isEmailVer?: boolean
  userId: string
}

export const PersonalInformation: FC<PropsType> = ({
  name,
  email,
  avatar,
  update,
  userId,
  isEmailVer,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [updatePhoto] = useUpdateProfileMutation()
  const [logout] = useLogoutMutation()
  const [resendVerEmail] = useResendVerificationEmailMutation()
  const hookWithToast = useMutationWithToast()

  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const formData = new FormData()

      formData.append('avatar', event.target.files[0])

      hookWithToast(updatePhoto(formData), 'Фото успешно обновлено')
    }
  }
  const onSubmit = (data: SignInFormShem) => {
    update(data.name)
  }

  //при offline происходит все равно редирект на login
  const logoutHandler = () => {
    hookWithToast(logout(), 'Всего хорошего')
  }

  const verifyEmail = () => {
    hookWithToast(
      resendVerEmail({
        userId,
        html: `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/confirm-email/##token##">here</a> to verify your password</p>`,
      }),
      `Сообщение отправлено по адресу ${email}`
    )
  }

  return (
    <div className={s.personalInfoBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Card className={s.block}>
        <Typography className={s.title} variant={'large'}>
          Personal Information
        </Typography>
        <div className={s.avatarBlock}>
          <div className={s.avatar}>
            <AvatarDemo src={avatar} name={name} className={s.avatar} />
            {!editMode && (
              <label htmlFor="mainPhotoInput">
                <div className={s.avatarEdit}>
                  <Edit />
                </div>
                <div className={s.inputContainer}>
                  <input
                    type={'file'}
                    id="mainPhotoInput"
                    onChange={mainPhotoSelected}
                    className={s.mainPhotoInput}
                  />
                </div>
              </label>
            )}
          </div>
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledTextField
              name={'name'}
              label={'Name'}
              defaultValue={name}
              type={'default'}
              control={control}
              className={s.editNickName}
              placeholder={'Name'}
            />
            <Button
              fullWidth={true}
              className={s.submit}
              type="submit"
              onClick={() =>
                setTimeout(() => {
                  setEditMode(false)
                }, 0)
              }
            >
              Save Changes
            </Button>
          </form>
        ) : (
          <div className={s.infoBlock}>
            <div className={s.nameBlock}>
              <Typography variant={'h1'} className={s.name}>
                {name}
              </Typography>
              <Edit
                className={s.changeName}
                onClick={() => {
                  setEditMode(true)
                }}
              />
            </div>
            <div className={s.emailBlock} style={isEmailVer ? { marginBottom: '20px' } : {}}>
              <Typography variant={'body2'} as={'span'} className={s.email}>
                {email}
              </Typography>
              {!isEmailVer && (
                <Button className={s.verify} variant={'primary'} onClick={verifyEmail}>
                  Verify email
                </Button>
              )}
            </div>

            <Button
              as={Link}
              to="/login"
              variant={'secondary'}
              className={s.logout}
              onClick={logoutHandler}
            >
              <Logout />
              <Typography variant={'subtitle2'}>Logout</Typography>
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
