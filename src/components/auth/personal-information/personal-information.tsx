import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './personalInformation.module.scss'

import { Edit, Logout } from '@/assets'
import { Button, Card, ControlledTextField, Typography } from '@/components/ui'
import { AvatarDemo } from '@/components/ui/avatar'

const sigInSchema = z.object({
  nickName: z.string().trim().min(1),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  name: string
  email: string
  avatar?: string
}

export const PersonalInformation: FC<PropsType> = ({ name, email, avatar }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  return (
    <Card className={s.block}>
      <Typography className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatarBlock}>
        <div className={s.avatar}>
          <AvatarDemo src={avatar} name={name} className={s.avatar} />
          {!editMode && (
            <div className={s.avatarEdit}>
              <Edit />
            </div>
          )}
        </div>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name={'nickName'}
            label={'Nickname'}
            defaultValue={name}
            type={'default'}
            control={control}
            className={s.editNickName}
            placeholder={'Nickname'}
          />
          <Button
            fullWidth={true}
            className={s.submit}
            type="submit"
            onClick={() => setEditMode(false)}
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
            <Edit className={s.changeName} onClick={() => setEditMode(true)} />
          </div>
          <Typography variant={'body2'} as={'span'} className={s.email}>
            {email}
          </Typography>
          <Button as={Link} to="/sign-up" variant={'secondary'} className={s.logout}>
            <Logout />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </div>
      )}
    </Card>
  )
}
