import { Navigate, useNavigate } from 'react-router-dom'

import { SignIn } from '@/components/auth'
import { useLoginMutation, useMeQuery } from '@/services/auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data, isLoading } = useMeQuery()
  const navigate = useNavigate()

  const loginHandler = (data: any) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  if (isLoading) return <div>...Loading</div>

  if (data) {
    return <Navigate to={'/'} />
  }

  return <SignIn onSubmit={loginHandler} />
}
