import type { Meta, StoryObj } from '@storybook/react'

import { Stars } from './stars.tsx'

const meta = {
  title: 'Components/Stars',
  component: Stars,
  tags: ['autodocs'],
} satisfies Meta<typeof Stars>

export default meta
type Story = StoryObj<typeof meta>

export const ShowSlider: Story = {
  args: {
    maxRating: 0,
    rating: 0,
  },
}
