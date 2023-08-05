import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './forgot-password.module.scss'

const sigInSchema = z.object({
  email: z.string().email(),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })

  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'enter your email'}
          control={control}
          className={s.email}
        />
        <Typography variant={'body2'} className={s.description}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Send Instructions
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        Did you remember your password?
      </Typography>
      <Button as={Link} to="/sign-in" variant={'link'} className={s.signUp}>
        Try logging in
      </Button>
    </Card>
  )
}
