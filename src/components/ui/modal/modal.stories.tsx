import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from '../checkbox'
import { RadioGroupDemo } from '../radioGroup'
import { TextField } from '../textfield'
import { Typography } from '../typography'

import { Modal } from './modal.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    isOpenModal: true,
    children: (
      <>
        <TextField type={'searchType'} />
        <TextField type={'default'} />
        <CheckboxDemo variant={'default'} />
        <Typography variant={'body1'}> Hello There!</Typography>
        <RadioGroupDemo />
      </>
    ),
  },
}
