import { FC, ReactNode, useState } from 'react'

import { Dialog } from '@headlessui/react'

import s from './modal.module.scss'

type PropsType = {
  isOpenModal: boolean
  children: ReactNode
}

export const Modal: FC<PropsType> = ({ isOpenModal, children }) => {
  let [isOpen, setIsOpen] = useState(isOpenModal)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={s.modalWrapper}>
      <Dialog.Panel className={s.dialog}>{children}</Dialog.Panel>
    </Dialog>
  )
}
