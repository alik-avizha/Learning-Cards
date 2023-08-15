import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from '../ui'

import { GlobalToast } from '@/components/ui/toast/toast.tsx'
import { useMeQuery } from '@/services/auth'

export const Layout = () => {
  const { data } = useMeQuery()

  return (
    <>
      <Header data={data} />
      <GlobalToast />
      <Outlet />
    </>
  )
}
