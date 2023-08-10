import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { SliderDemo } from './'

const meta = {
  title: 'Components/Slider',
  component: SliderDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

const [value, setValue] = useState<number[]>([0, 10])

export const ShowSlider: Story = {
  args: {
    value,
    setValue,
    maxValue: 10,
  },
}
