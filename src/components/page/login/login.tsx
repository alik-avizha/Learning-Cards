import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import { useMutationWithToast } from '@/common'
import { SignIn } from '@/components/auth'
import { Loader } from '@/components/ui/loader/loader.tsx'
import { useLoginMutation, useMeQuery } from '@/services/auth'

export const Login = () => {
  const [login] = useLoginMutation()
  const { t } = useTranslation()
  const { data, isLoading } = useMeQuery()
  const hookWithToast = useMutationWithToast()

  const loginHandler = async (data: any) => {
    await hookWithToast(login(data), t('sign-in.toast'))
  }

  if (isLoading) return <Loader />

  if (data) {
    return <Navigate to={'/'} />
  }

  return <SignIn onSubmit={loginHandler} />
}
