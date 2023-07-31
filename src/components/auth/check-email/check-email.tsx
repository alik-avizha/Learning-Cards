import { FC } from 'react'

import { Email } from '../../../assets'
import { Button, Card, Typography } from '../../ui'

import s from './check-email.module.scss'

type PropsType = {
  email: string
}
export const CheckEmail: FC<PropsType> = ({ email }) => {
  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'body2'} className={s.description}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button fullWidth={true} className={s.backToSignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
