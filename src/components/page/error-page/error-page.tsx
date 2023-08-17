import { Link } from 'react-router-dom'

import error from './../../../assets/icons/error.png'
import s from './error-page.module.scss'

import { Button, Typography } from '@/components/ui'
export const ErrorPage = () => {
  return (
    <div className={s.errorPage}>
      <img src={error} alt="error" className={s.error} />
      <Typography variant={'body1'} className={s.errorMessage}>
        Sorry! Page not found!
      </Typography>
      <Button as={Link} to={'/'} variant={'primary'}>
        Back to home page
      </Button>
    </div>
  )
}
