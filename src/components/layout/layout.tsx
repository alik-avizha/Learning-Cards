import { Outlet } from 'react-router-dom'

import { Header } from '../ui'

import { useMeQuery } from '@/services/auth'

export const Layout = () => {
  const { data } = useMeQuery()

  return (
    <>
      <Header data={data} />
      <Outlet />
    </>
  )
}
