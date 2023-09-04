import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { useMutationWithToast } from '@/common'
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
  const hookWithToast = useMutationWithToast()
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmit = async (data: SignInFormShem) => {
    const result = await hookWithToast(
      signUp({
        email: data.email,
        password: data.password,
        sendConfirmationEmail: false,
      }),
      t('sign-up.toast')
    )

    if (result?.success) {
      navigate(`/check-email/${data.email}`)
    }
  }

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        {t('sign-up.title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'email'}
          label={t('sign-up.emailLabel')}
          type={'default'}
          placeholder={t('sign-up.emailPlaceholder')}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={t('sign-up.passwordLabel')}
          type={'password'}
          placeholder={t('sign-up.passwordPlaceholder')}
          control={control}
          className={s.password}
        />
        <ControlledTextField
          name={'confirmPassword'}
          label={t('sign-up.confirmPasswordLabel')}
          type={'password'}
          placeholder={t('sign-up.confirmPasswordPlaceholder')}
          control={control}
          className={s.confirmPassword}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          {t('sign-up.signUpButton')}
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        {t('sign-up.haveAccount')}
      </Typography>
      <Button as={Link} to="/login" variant={'link'} className={s.signIn}>
        {t('sign-up.signInButton')}
      </Button>
    </Card>
  )
}
