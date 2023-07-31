import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './create-new-password.module.scss'

const sigInSchema = z.object({
  password: z.string().min(3),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const CreateNewPassword = () => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })

  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  return (
    <Card className={s.createPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
        />
        <Typography variant={'body2'} className={s.description}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Create New Password{' '}
        </Button>
      </form>
    </Card>
  )
}
