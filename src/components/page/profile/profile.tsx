import { useMutationWithToast } from '@/common'
import { PersonalInformation } from '@/components/auth'
import { useMeQuery, useUpdateProfileMutation } from '@/services/auth'

export const Profile = () => {
  const { data } = useMeQuery()
  const [update] = useUpdateProfileMutation()
  const hookWithToast = useMutationWithToast()
  const onSaveChanges = async (value: string) => {
    const form = new FormData()

    form.append('name', value)

    await hookWithToast(update(form), 'Имя успешно обновлено')
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
