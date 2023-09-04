import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(sigInSchema),
  })
  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        {t('sign-in.title')}
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <ControlledTextField
          name={'email'}
          label={t('sign-in.emailLabel')}
          type={'default'}
          placeholder={t('sign-in.emailPlaceholder')}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={t('sign-in.passwordLabel')}
          type={'password'}
          placeholder={t('sign-in.passwordPlaceholder')}
          control={control}
          className={s.password}
          autoComplete={'on'}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          variant={'withText'}
          checkBoxText={t('sign-in.rememberMe')}
        />
        <div className={s.forgotWrapper}>
          <Button as={Link} to="/forgot-password" variant={'link'} className={s.forgotPassword}>
            <Typography variant={'body2'}>{t('sign-in.forgotPassword')}</Typography>
          </Button>
        </div>
        <Button fullWidth={true} className={s.submit} type="submit">
          {t('sign-in.signInButton')}
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        {t('sign-in.noAccount')}
      </Typography>
      <Button as={Link} to="/sign-up" variant={'link'} className={s.signUp}>
        {t('sign-in.signUpButton')}
      </Button>
    </Card>
  )
}
