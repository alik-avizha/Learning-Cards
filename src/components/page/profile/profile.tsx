import { PersonalInformation } from '@/components/auth'
import { useMeQuery, useUpdateProfileMutation } from '@/services/auth'

export const Profile = () => {
  const { data } = useMeQuery()
  const [update] = useUpdateProfileMutation()

  const onSaveChanges = (value: string) => {
    const form = new FormData()

    form.append('name', value)
    update(form)
  }

  return (
    <PersonalInformation
      name={data?.name}
      email={data?.email}
      avatar={data?.avatar}
      update={onSaveChanges}
      isEmailVer={data?.isEmailVerified}
      userId={data!.id}
    />
  )
}
