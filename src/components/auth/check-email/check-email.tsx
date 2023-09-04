import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import s from './check-email.module.scss'

import { Email } from '@/assets'
import { Button, Card, Typography } from '@/components/ui'

export const CheckEmail = () => {
  const params = useParams<{ email: string }>()
  const { t } = useTranslation()

  return (
    <Card className={s.checkEmailBlock}>
      <Typography className={s.title} variant={'large'}>
        {t('check-email.title')}
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'body2'} className={s.description}>
        {t('check-email.address')} {params.email}
      </Typography>
      <Button as={Link} to="/login" fullWidth={true} className={s.backToSignIn}>
        {t('check-email.backToSignIn')}
      </Button>
    </Card>
  )
}
