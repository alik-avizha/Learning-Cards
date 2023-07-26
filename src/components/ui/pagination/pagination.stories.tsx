import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationStory: Story = {
  args: {
    count: 100,
    perPageOptions: [100, 200, 300],
    page: 1,
    perPage: 10,
    siblings: 1,
    onPerPageChange: () => {},
    onChange: () => {},
  },
}
