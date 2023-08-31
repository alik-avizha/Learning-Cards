import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Button, Modal } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

export const ModalDemo = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant={'primary'} onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        title={'hello'}
        showCloseButton={true}
        open={open}
        onClose={handleClose}
        titleButton={'delete'}
      ></Modal>
    </>
  )
}
