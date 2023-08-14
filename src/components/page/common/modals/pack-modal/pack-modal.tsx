import { CheckboxDemo, TextField } from '@/components/ui'
import { modalActions, selectSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const PackModal = () => {
  const { packName, privatePack } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  const setPackName = (value: string) => {
    dispatch(modalActions.setPackName(value))
  }
  const setPrivatePack = (value: boolean) => {
    dispatch(modalActions.setPrivatePack(value))
  }

  return (
    <>
      <TextField
        type={'default'}
        value={packName}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setPackName(e)}
      />
      <CheckboxDemo
        variant={'withText'}
        checkBoxText={'Private pack'}
        checked={privatePack}
        onChange={() => setPrivatePack(!privatePack)}
      />
    </>
  )
}
