import { Outlet } from 'react-router-dom'

import { Header } from '../ui'

export const Layout = () => {
  return (
    <>
      <Header isAuth={true} />
      <Outlet />
    </>
  )
}
