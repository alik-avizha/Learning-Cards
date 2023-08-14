import { Link, useParams } from 'react-router-dom'

import s from './check-email.module.scss'

import { Email } from '@/assets'
import { Button, Card, Typography } from '@/components/ui'

export const CheckEmail = () => {
  const params = useParams<{ email: string }>()

  return (
    <Card className={s.checkEmailBlock}>
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'body2'} className={s.description}>
        We’ve sent an Email with instructions to {params.email}
      </Typography>
      <Button as={Link} to="/sign-in" fullWidth={true} className={s.backToSignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
