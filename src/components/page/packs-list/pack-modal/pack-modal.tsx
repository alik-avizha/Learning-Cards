import { FC } from 'react'

import { CheckboxDemo, Modal, TextField, Typography } from '../../../ui'

import s from './pack-modal.module.scss'
import { ModalType } from './types.ts'

type PropsType = {
  open: ModalType
  packName: string
  handleClose: (value: string) => void
  onHandlerActionClicked: () => void
  setPackName: (value: string) => void
  privatePack: boolean
  setPrivatePack: (value: boolean) => void
}

export const PackModal: FC<PropsType> = props => {
  const {
    open,
    packName,
    handleClose,
    onHandlerActionClicked,
    setPackName,
    privatePack,
    setPrivatePack,
  } = props

  let onCloseHandler

  if (open.addNewPack) {
    onCloseHandler = () => handleClose('addNewPack')
  } else if (open.editPack) {
    onCloseHandler = () => handleClose('editPack')
  } else {
    onCloseHandler = () => handleClose('deletePack')
  }

  return (
    <Modal
      title={open.addNewPack ? 'Add New Pack' : 'Edit Pack'}
      showCloseButton={true}
      open={open.addNewPack || open.editPack || open.deletePack}
      onClose={onCloseHandler}
      titleButton={
        (open.addNewPack && 'Add New Pack') ||
        (open.editPack && 'Save Changes') ||
        (open.deletePack && 'Delete Pack') ||
        'Button Name'
      }
      disableButton={
        (!packName && (open.editPack || open.addNewPack)) || (open.deletePack && !!packName)
      }
      callBack={onHandlerActionClicked}
    >
      {open.addNewPack || open.editPack ? (
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
      ) : (
        <Typography variant={'body1'}>
          Do you really want to remove{' '}
          <Typography variant={'subtitle1'} className={s.packName}>
            Pack Name?
          </Typography>{' '}
          <br />
          All cards will be deleted.
        </Typography>
      )}
    </Modal>
  )
}
