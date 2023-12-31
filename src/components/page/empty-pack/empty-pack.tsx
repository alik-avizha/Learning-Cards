import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './empty-pack.module.scss'

import { Back } from '@/assets'
import { useMutationWithToast } from '@/common'
import { AddEditCardModal } from '@/components/page/common/modals'
import { Button, Typography } from '@/components/ui'
import { useCreateCardMutation } from '@/services/cards'
import { modalActions, selectCardSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const EmptyPack = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string; name: string }>()

  const { question, answer, questionImg, answerImg } = useAppSelector(selectCardSettings)
  const hookWithToast = useMutationWithToast()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [createCard] = useCreateCardMutation()
  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }
  const addCardHandler = async () => {
    const formData = new FormData()

    formData.append('question', question)
    formData.append('answer', answer)
    questionImg && formData.append('questionImg', questionImg)
    answerImg && formData.append('answerImg', answerImg)

    const result = await hookWithToast(
      createCard({ id: params.id, formData }),
      t('empty-pack.toast')
    )

    if (result?.success) {
      navigate(`/my-pack/${params.id}`)
    }

    dispatch(modalActions.setCloseModal('addCard'))
    dispatch(modalActions.setQuestion(''))
    dispatch(modalActions.setAnswer(''))
  }

  return (
    <div className={s.emptyPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        {t('empty-pack.back')}
      </Button>
      <Typography variant={'large'} className={s.title}>
        {params.name}
      </Typography>
      <Typography variant={'body1'} className={s.description}>
        {t('empty-pack.thisPackIsEmpty')}
      </Typography>
      <div className={s.addNewPackButton}>
        <Button variant={'primary'} onClick={setOpen}>
          {t('empty-pack.addNewCard')}
        </Button>
      </div>
      <AddEditCardModal onSubmit={addCardHandler} />
    </div>
  )
}
