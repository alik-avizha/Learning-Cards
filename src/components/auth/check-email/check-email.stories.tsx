import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './check-email.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailStory: Story = {
  args: {
    email: 'egorbelozerov@mail.ru',
  },
}
