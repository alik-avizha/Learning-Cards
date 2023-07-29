import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 50 },
  { id: 5, value: 100 },
]

export const PaginationStory: Story = {
  args: {
    count: 100,
    perPageOptions: options,
    page: 5,
    perPage: options[0],
    siblings: 1,
    onPerPageChange: () => {},
    onChange: () => {},
  },
}
