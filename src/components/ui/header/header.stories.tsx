import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'
import { Header } from '@/components/ui'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const data = {
  avatar: '',
  id: 'string',
  email: 'D',
  isEmailVerified: true,
  name: 'D',
  created: '2023-08-08T12:12:18.493Z',
  updated: '2023-08-08T12:12:18.493Z',
}

export const HeaderIsAuth: Story = { args: { data: data } }
export const HeaderInNotAuth: Story = { args: { data: data } }
