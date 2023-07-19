import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowRadioGroup: Story = {}
