import type { Meta, StoryObj } from '@storybook/react'

import { Grade } from '@/components/ui/grade/grade.tsx'

const meta = {
  title: 'Components/Stars',
  component: Grade,
  tags: ['autodocs'],
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>

export const GradeStory: Story = {
  args: {
    maxRating: 0,
    rating: 0,
  },
}
