import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { CheckEmail, CreateNewPassword, ForgotPassword, SignUp } from './components/auth'
import { Layout } from './components/layout'
import { PacksList } from './components/page'
import { EmptyPack } from './components/page/empty-pack'
import { FriendsPack } from './components/page/friends-pack'
import { LearnPack } from './components/page/learn-pack'
import { Login } from './components/page/login/login.tsx'
import { MyPack } from './components/page/my-pack'
import { useMeQuery } from './services/auth'

import { ConfirmationEmail } from '@/components/auth/confirmation-email'
import { ErrorPage } from '@/components/page/error-page'
import { Profile } from '@/components/page/profile/profile.tsx'
import { Loader } from '@/components/ui/loader/loader.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/recover-password/:token',
    element: <CreateNewPassword />,
  },
  {
    path: '/check-email/:email',
    element: <CheckEmail />,
  },
  {
    path: '/confirm-email/:code',
    element: <ConfirmationEmail />,
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
  {
    path: '/friends-pack/:id',
    element: <FriendsPack />,
  },
  {
    path: '/empty-pack/:name/:id',
    element: <EmptyPack />,
  },
  {
    path: '/learn-pack/:id',
    element: <LearnPack />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoutes />,

        children: privateRoutes,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
      ...publicRoutes,
    ],
  },
])

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  return data ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
