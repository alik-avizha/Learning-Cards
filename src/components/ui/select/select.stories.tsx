import type { Meta, StoryObj } from '@storybook/react'

import { SelectDemo } from './'

const meta = {
  title: 'Components/Select',
  component: SelectDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    isDisabled: false,
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    isDisabled: true,
  },
}
