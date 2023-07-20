import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input.tsx'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
  args: {
    placeholder: 'Default',
    type: 'default',
    disableValue: false,
  },
}
export const InputDefaultError: Story = {
  args: {
    placeholder: 'Default',
    type: 'default',
    disableValue: false,
    errorMessage: 'Error!',
  },
}
export const InputPassword: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    disableValue: false,
  },
}
export const InputPasswordError: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    disableValue: false,
    errorMessage: 'Error!',
  },
}
export const InputSearch: Story = {
  args: {
    placeholder: 'Search',
    type: 'search',
    disableValue: false,
  },
}
export const InputSearchError: Story = {
  args: {
    placeholder: 'Search',
    type: 'search',
    disableValue: false,
    errorMessage: 'Error!',
  },
}
