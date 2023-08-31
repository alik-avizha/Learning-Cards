import { FC } from 'react'

import s from './delete-pack-card-modal.module.scss'

import { Modal, Typography } from '@/components/ui'
import { modalActions, selectCardSettings, selectOpen, selectPackSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type PropsType = {
  onSubmit: () => void
}
export const DeletePackCardModal: FC<PropsType> = ({ onSubmit }) => {
  const open = useAppSelector(selectOpen)
  const { packName } = useAppSelector(selectPackSettings)
  const { question } = useAppSelector(selectCardSettings)
  const dispatch = useAppDispatch()

  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  let openModal
  let titleButton
  let title

  if (open === 'deletePack') {
    openModal = open === 'deletePack'
    titleButton = 'Delete Pack'
    title = 'Delete Pack'
  } else if (open === 'deleteCard') {
    openModal = open === 'deleteCard'
    titleButton = 'Delete Card'
    title = 'Delete Card'
  }

  return (
    <Modal
      title={title}
      titleButton={titleButton}
      open={openModal}
      onClose={setClose}
      showCloseButton={true}
      callBack={onSubmit}
    >
      <Typography variant={'body1'}>
        Do you really want to remove{' '}
        <Typography variant={'subtitle1'} className={s.packName}>
          {open === 'deletePack' ? packName : question}?
        </Typography>
        <br />
        All cards will be deleted.
      </Typography>
    </Modal>
  )
}
