import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '../../../common/utils/decorators.tsx'

import { ForgotPassword } from './forgot-password.tsx'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordStory: Story = {}
