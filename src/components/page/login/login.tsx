import { useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { useLoginMutation, useMeQuery } from '../../../services/auth'
import { SignIn } from '../../auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data, isUninitialized } = useMeQuery()
  const navigate = useNavigate()

  const loginHandler = (data: any) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  useEffect(() => {
    if (!data) return

    navigate('/')
  }, [data])

  if (isUninitialized) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <SignIn onSubmit={loginHandler} />
    </>
  )
}
