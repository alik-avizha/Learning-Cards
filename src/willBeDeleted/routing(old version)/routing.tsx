import { Route, Routes } from 'react-router-dom'

import { CheckEmail, CreateNewPassword, ForgotPassword, SignUp } from '../../components/auth'
import { Login } from '../../components/page/login/login.tsx'
import { Typography } from '../../components/ui'

export const Routing = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Typography variant={'body2'}>Hello</Typography>} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/create-new-password'} element={<CreateNewPassword />} />
      <Route path={'/forgot-password'} element={<ForgotPassword />} />
      <Route path={'/check-email'} element={<CheckEmail email={'egorbelozerov@mail.ru'} />} />
    </Routes>
  )
}
