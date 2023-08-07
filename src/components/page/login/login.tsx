import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLoginMutation, useMeQuery } from '../../../services/auth'
import { SignIn } from '../../auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data } = useMeQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) return

    navigate('/')
  }, [data])

  return (
    <>
      <SignIn onSubmit={login} />
    </>
  )
}
