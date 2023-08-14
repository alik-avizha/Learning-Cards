import { TextField } from '@/components/ui'
import { modalActions, selectSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const CardModal = () => {
  const { question, answer } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  const setQuestion = (value: string) => {
    dispatch(modalActions.setQuestion(value))
  }
  const setAnswer = (value: string) => {
    dispatch(modalActions.setAnswer(value))
  }

  return (
    <>
      <TextField
        type={'default'}
        value={question}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setQuestion(e)}
      />
      <TextField
        type={'default'}
        value={answer}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setAnswer(e)}
      />
    </>
  )
}
