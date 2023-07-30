import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { ControlledCheckbox } from '../../ui/controlled'
import { TextField } from '../../ui/textfield'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <TextField
        {...register('email')}
        errorMessage={errors.email?.message}
        label={'email'}
        type={'default'}
      />
      <TextField
        {...register('password')}
        errorMessage={errors.password?.message}
        label={'password'}
        type={'password'}
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
