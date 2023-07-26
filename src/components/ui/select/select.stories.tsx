import type { Meta, StoryObj } from '@storybook/react'

import { SelectDemo } from './'

const meta = {
  title: 'Components/Select',
  component: SelectDemo,
  tags: ['autodocs'],
  argTypes: { onChangeOption: { action: 'select changes' } },
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

const people = [
  { id: 1, value: 'Durward Reynolds' },
  { id: 2, value: 'Kenton Towne' },
  { id: 3, value: 'Therese Wunsch' },
  { id: 4, value: 'Benedict Kessler' },
  { id: 5, value: 'Katelyn Rohan' },
]

export const SelectStory: Story = {
  args: {
    isDisabled: false,
    options: people,
    value: people[0],
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    isDisabled: true,
    options: people,
    value: people[0],
  },
}
