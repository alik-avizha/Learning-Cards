import { ChangeEvent, FC } from 'react'

import s from './add-edit-card-modal.module.scss'

import { ChangeImgDeck } from '@/assets'
import { Button, Modal, TextField } from '@/components/ui'
import { modalActions, selectCardSettings, selectOpen } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type PropsType = {
  onSubmit: () => void
}
export const AddEditCardModal: FC<PropsType> = ({ onSubmit }) => {
  const open = useAppSelector(selectOpen)
  const { question, answer, questionImg, answerImg, questionEditImg, answerEditImg } =
    useAppSelector(selectCardSettings)
  const dispatch = useAppDispatch()
  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  let openModal
  let title
  let titleButton
  let questionImage
  let answerImage

  if (open === 'addCard') {
    openModal = open === 'addCard'
    title = 'Add New Card'
    titleButton = 'Add New Card'
    questionImage = questionImg && URL.createObjectURL(questionImg)
    answerImage = answerImg && URL.createObjectURL(answerImg)
  } else if (open === 'editCard') {
    openModal = open === 'editCard'
    title = 'Edit Card'
    titleButton = 'Save Changes'
    questionImage = questionImg ? URL.createObjectURL(questionImg) : questionEditImg || ''
    answerImage = answerImg ? URL.createObjectURL(answerImg) : answerEditImg || ''
  }
  const setQuestion = (value: string) => {
    dispatch(modalActions.setQuestion(value))
  }
  const setAnswer = (value: string) => {
    dispatch(modalActions.setAnswer(value))
  }

  const handleQuestionChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    dispatch(modalActions.setQuestionImg(file))
  }
  const handleAnswerChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    dispatch(modalActions.setAnswerImg(file))
  }

  return (
    <Modal
      title={title}
      showCloseButton={true}
      open={openModal}
      onClose={setClose}
      titleButton={titleButton}
      callBack={onSubmit}
    >
      <TextField
        type={'default'}
        value={question}
        label={'Question'}
        placeholder={'Question'}
        onChangeText={e => setQuestion(e)}
      />
      <div>
        {questionImage && <img src={questionImage} className={s.packImg} alt={'pack img'} />}
        <label htmlFor="questionImg" className={s.labelBlock}>
          <Button as={'a'} variant={'secondary'} className={s.changeButton}>
            <ChangeImgDeck /> Change Cover
          </Button>
          <div>
            <input
              type={'file'}
              id="questionImg"
              onChange={handleQuestionChangeCover}
              className={s.input}
            />
          </div>
        </label>
      </div>
      <TextField
        type={'default'}
        value={answer}
        label={'Answer'}
        placeholder={'Answer'}
        onChangeText={e => setAnswer(e)}
      />
      <div>
        {answerImage && <img src={answerImage} className={s.packImg} alt={'pack img'} />}
        <label htmlFor="answerImg" className={s.labelBlock}>
          <Button as={'a'} variant={'secondary'} className={s.changeButton}>
            <ChangeImgDeck /> Change Cover
          </Button>
          <div>
            <input
              type={'file'}
              id="answerImg"
              onChange={handleAnswerChangeCover}
              className={s.input}
            />
          </div>
        </label>
      </div>
    </Modal>
  )
}
