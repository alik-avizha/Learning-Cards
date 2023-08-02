import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '../../../common/utils/decorators.tsx'

import { SignUp } from './sign-up.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Sign_Up: Story = {}
