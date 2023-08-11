import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledCheckbox, ControlledTextField } from '../../ui'
import s from '../sign-in/sign-in.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlledTextField
        name={'email'}
        label={'Email'}
        type={'default'}
        control={control}
        className={s.email}
      />
      <ControlledTextField
        name={'password'}
        label={'Password'}
        type={'password'}
        control={control}
        className={s.password}
      />
      <ControlledCheckbox
        variant={'withText'}
        checkBoxText={'remember me'}
        control={control}
        name={'rememberMe'}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
