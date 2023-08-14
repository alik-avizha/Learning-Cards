import { PersonalInformation } from '@/components/auth'
import { useLogoutMutation, useMeQuery, useUpdateProfileMutation } from '@/services/auth'

export const Profile = () => {
  const { data } = useMeQuery()
  const [update] = useUpdateProfileMutation()
  const [logout] = useLogoutMutation()

  const onSaveChanges = (value: string) => {
    const form = new FormData()

    form.append('name', value)
    update(form)
  }

  return (
    <PersonalInformation
      name={data?.name}
      email={data?.email}
      update={onSaveChanges}
      logout={logout}
    />
  )
}
