import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { useMutationWithToast } from '@/common'
import { Button, Card, ControlledTextField, Typography } from '@/components/ui'
import { useForgotPasswordMutation } from '@/services/auth'

const sigInSchema = z.object({
  email: z.string().email(),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const navigate = useNavigate()
  const hookWithToast = useMutationWithToast()
  const [forgotPassword] = useForgotPasswordMutation()
  const { t } = useTranslation()

  const onSubmit = async (data: SignInFormShem) => {
    const result = await hookWithToast(
      forgotPassword({
        ...data,
        html: `<h1>Hi, ##name##</h1><p>Click <a href="https://flaskcards-project.vercel.app/recover-password/##token##">here</a> to recover your password</p>`,
      }),
      t('forgot-password.toast')
    )

    if (result?.success) {
      navigate(`/check-email/${data.email}`)
    }
  }

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        {t('forgot-password.title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'email'}
          label={t('forgot-password.emailLabel')}
          type={'default'}
          placeholder={t('forgot-password.emailPlaceholder')}
          control={control}
          className={s.email}
        />
        <Typography variant={'body2'} className={s.description}>
          {t('forgot-password.text')}
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          {t('forgot-password.sendInstructions')}
        </Button>
      </form>
      <Typography variant={'body2'} className={s.question}>
        {t('forgot-password.didYouRememberPassword')}
      </Typography>
      <Button as={Link} to="/login" variant={'link'} className={s.signUp}>
        {t('forgot-password.tryLoggingIn')}
      </Button>
    </Card>
  )
}
