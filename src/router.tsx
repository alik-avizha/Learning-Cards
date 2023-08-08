import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from './components/layout'
import { PacksList } from './components/page'
import { Login } from './components/page/login/login.tsx'
import { MyPack } from './components/page/my-pack'
import { useMeQuery } from './services/auth'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PacksList />,
  },
  {
    path: '/my-pack/:id',
    element: <MyPack />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <div>...Loading</div>

  return data ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
