import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '@/components/auth'
import { Loader } from '@/components/ui/loader/loader.tsx'
import { useLoginMutation, useMeQuery } from '@/services/auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data, isLoading } = useMeQuery()
  const navigate = useNavigate()

  const loginHandler = (data: any) => {
    login(data)
      .unwrap()
      .then(() => {
        toast.success('Успешный вход')
        navigate('/')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  if (isLoading) return <Loader />

  if (data) {
    return <Navigate to={'/'} />
  }

  return <SignIn onSubmit={loginHandler} />
}
