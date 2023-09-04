import { FC } from 'react'

import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  let openModal
  let titleButton
  let title

  if (open === 'deletePack') {
    openModal = open === 'deletePack'
    titleButton = t('delete-pack-card-modal.titlePack')
    title = t('delete-pack-card-modal.titlePack')
  } else if (open === 'deleteCard') {
    openModal = open === 'deleteCard'
    titleButton = t('delete-pack-card-modal.titleCard')
    title = t('delete-pack-card-modal.titleCard')
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
        {t('delete-pack-card-modal.question')}{' '}
        <Typography variant={'subtitle1'} className={s.packName}>
          {open === 'deletePack' ? packName : question}?
        </Typography>
        <br />
        {open === 'deletePack' ? t('delete-pack-card-modal.allCards') : ''}
      </Typography>
    </Modal>
  )
}
