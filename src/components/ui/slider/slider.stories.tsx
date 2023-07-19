import type { Meta, StoryObj } from '@storybook/react'

import { SliderDemo } from './'

const meta = {
  title: 'Components/Slider',
  component: SliderDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowSlider: Story = {
  args: {
    minValue: 0,
    maxValue: 100,
  },
}
