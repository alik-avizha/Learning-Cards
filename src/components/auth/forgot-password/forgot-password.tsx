import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

  const onSubmit = async (data: SignInFormShem) => {
    const result = await hookWithToast(
      forgotPassword({
        ...data,
        html: `<h1>Hi, ##name##</h1><p>Click <a href="https://flaskcards-project.vercel.app/recover-password/##token##">here</a> to recover your password</p>`,
      }),
      'Пароль успешно cброшен'
    )

    if (result?.success) {
      navigate(`/check-email/${data.email}`)
    }
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
      <Button as={Link} to="/login" variant={'link'} className={s.signUp}>
        Try logging in
      </Button>
    </Card>
  )
}
