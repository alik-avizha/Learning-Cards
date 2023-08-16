import { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './confirmation-email.module.scss'

import { OkEmail } from '@/assets'
import { Button, Card, Typography } from '@/components/ui'
import { useVerificationEmailMutation } from '@/services/auth'

export const ConfirmationEmail = () => {
  const params = useParams<{ code: string }>()
  const [sendToken] = useVerificationEmailMutation()

  useEffect(() => {
    sendToken({ code: params.code })
  }, [])

  return (
    <Card className={s.emailBlock}>
      <Typography className={s.title} variant={'large'}>
        Email Сonfirmed
      </Typography>
      <OkEmail className={s.emailIcon} />
      <Button as={Link} to="/login" fullWidth={true} className={s.backToSignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
