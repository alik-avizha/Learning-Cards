import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '@/common'
import { CheckEmail } from '@/components/auth'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailStory: Story = {
  args: {
    email: 'egorbelozerov@mail.ru',
  },
}
