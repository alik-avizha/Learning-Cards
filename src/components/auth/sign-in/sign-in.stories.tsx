import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './sign-in.tsx'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Sign_In: Story = {}
