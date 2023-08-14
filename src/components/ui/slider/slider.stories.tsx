import type { Meta, StoryObj } from '@storybook/react'

import { SliderDemo } from '@/components/ui'

const meta = {
  title: 'Components/Slider',
  component: SliderDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowSlider: Story = {
  args: {
    value: [0, 10],
    setValue: () => {},
    maxValue: 10,
  },
}
