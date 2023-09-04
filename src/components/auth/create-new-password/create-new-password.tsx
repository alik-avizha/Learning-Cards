import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { useMutationWithToast } from '@/common'
import { Button, Card, ControlledTextField, Typography } from '@/components/ui'
import { useResetPasswordMutation } from '@/services/auth'

const sigInSchema = z.object({
  password: z.string().min(3),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const CreateNewPassword = () => {
  const params = useParams<{ token: string }>()
  const navigate = useNavigate()
  const hookWithToast = useMutationWithToast()
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })

  const [setNewPassword] = useResetPasswordMutation()
  const onSubmit = async (data: SignInFormShem) => {
    const result = await hookWithToast(
      setNewPassword({ password: data.password, token: params.token }),
      t('create-new-password.toast')
    )

    if (result?.success) {
      navigate('/login')
    }
  }

  return (
    <Card className={s.createPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        {t('create-new-password.title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'password'}
          label={t('create-new-password.passwordLabel')}
          type={'password'}
          placeholder={t('create-new-password.passwordPlaceholder')}
          control={control}
          className={s.password}
        />
        <Typography variant={'body2'} className={s.description}>
          {t('create-new-password.text')}
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          {t('create-new-password.createNewPassword')}
        </Button>
      </form>
    </Card>
  )
}
