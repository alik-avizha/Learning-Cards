import { ChangeEvent, FC } from 'react'

import imgDeck from '../../../../../assets/icons/imgDeck.jpg'

import s from './add-edit-pack-modal.module.scss'

import { ChangeImgDeck } from '@/assets'
import { Button, CheckboxDemo, Modal, TextField } from '@/components/ui'
import { modalActions, selectOpen, selectPackSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type PropsType = {
  onSubmit: () => void
}

export const AddEditPackModal: FC<PropsType> = props => {
  const { onSubmit } = props
  const open = useAppSelector(selectOpen)
  const { packName, privatePack, img, editImg } = useAppSelector(selectPackSettings)
  const dispatch = useAppDispatch()

  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  let openModal
  let title
  let titleButton
  let packImg

  if (open === 'addPack') {
    openModal = open === 'addPack'
    title = 'Add New Pack'
    titleButton = 'Add New Pack'
    packImg = img ? URL.createObjectURL(img) : imgDeck
  } else if (open === 'editPack') {
    openModal = open === 'editPack'
    title = 'Edit Pack'
    titleButton = 'Save Changes'
    packImg = img ? URL.createObjectURL(img) : editImg || imgDeck
  }
  const setPackName = (value: string) => {
    dispatch(modalActions.setPackName(value))
  }
  const setPrivatePack = (value: boolean) => {
    dispatch(modalActions.setPrivatePack(value))
  }

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    dispatch(modalActions.setImg(file))
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
      <div>
        <img src={packImg} className={s.packImg} alt={'pack img'} />
        <label htmlFor="packImg" className={s.labelBlock}>
          <Button as={'a'} variant={'secondary'} className={s.changeButton}>
            <ChangeImgDeck /> Change Cover
          </Button>
          <div>
            <input type={'file'} id="packImg" onChange={handleChangeCover} className={s.input} />
          </div>
        </label>
      </div>
      <TextField
        type={'default'}
        value={packName}
        onChangeText={e => setPackName(e)}
        label={'Name Pack'}
        placeholder={'Name Pack'}
      />
      <CheckboxDemo
        variant={'withText'}
        checked={privatePack}
        onChange={() => setPrivatePack(!privatePack)}
        checkBoxText={'Private Pack'}
      />
    </Modal>
  )
}
