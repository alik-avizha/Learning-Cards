import { Outlet } from 'react-router-dom'

import { useMeQuery } from '../../services/auth'
import { Header } from '../ui'

export const Layout = () => {
  const { data } = useMeQuery()

  return (
    <>
      <Header data={data} />
      <Outlet />
    </>
  )
}
