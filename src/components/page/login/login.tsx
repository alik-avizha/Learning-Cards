import { Navigate, useNavigate } from 'react-router-dom'

import { useMutationWithToast } from '@/common'
import { SignIn } from '@/components/auth'
import { Loader } from '@/components/ui/loader/loader.tsx'
import { useLoginMutation, useMeQuery } from '@/services/auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data, isLoading } = useMeQuery()
  const hookWithToast = useMutationWithToast()
  const navigate = useNavigate()

  const loginHandler = (data: any) => {
    hookWithToast(login(data), 'Успешный вход').then(() => {
      navigate('/')
    })
  }

  if (isLoading) return <Loader />

  if (data) {
    return <Navigate to={'/'} />
  }

  return <SignIn onSubmit={loginHandler} />
}
