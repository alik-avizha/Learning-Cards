import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '@/components/ui'

const sigInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  onSubmit: (data: SignInFormShem) => void
}
export const SignIn: FC<PropsType> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <DevTool control={control} />
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'enter your email'}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          variant={'withText'}
          checkBoxText={'Remember me'}
        />
        <div className={s.forgotWrapper}>
          <Button as={Link} to="/forgot-password" variant={'link'} className={s.forgotPassword}>
            <Typography variant={'body2'}>Forgot Password?</Typography>
          </Button>
        </div>
        <Button fullWidth={true} className={s.submit} type="submit">
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        Don&apos;t have an account?
      </Typography>
      <Button as={Link} to="/sign-up" variant={'link'} className={s.signUp}>
        Sign Up
      </Button>
    </Card>
  )
}
