import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button, Card, ControlledTextField, Typography } from '@/components/ui'
import { useSignUpMutation } from '@/services/auth'

const sigInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type SignInFormShem = z.infer<typeof sigInSchema>
export const SignUp = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmit = (data: SignInFormShem) => {
    signUp({
      email: data.email,
      password: data.password,
      sendConfirmationEmail: false,
    })
      .unwrap()
      .then(() => {
        navigate(`/check-email/${data.email}`)
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Sign Up
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
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
        />
        <ControlledTextField
          name={'confirmPassword'}
          label={'Confirm password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.confirmPassword}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        Already have an account?
      </Typography>
      <Button as={Link} to="/login" variant={'link'} className={s.signIn}>
        Sign In
      </Button>
    </Card>
  )
}
