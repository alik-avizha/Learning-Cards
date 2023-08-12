import { useLoginMutation } from '../../../../services/auth'
import { SignIn } from '../../../auth'

export const SignInPage = () => {
  const [login] = useLoginMutation()

  return <SignIn onSubmit={login} />
}
