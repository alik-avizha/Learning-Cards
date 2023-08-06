import { Outlet } from 'react-router-dom'

import { Header } from '../components/ui'

const Layout = () => {
  return (
    <div>
      <Header isAuth={true} />
      <Outlet />
    </div>
  )
}

export default Layout
