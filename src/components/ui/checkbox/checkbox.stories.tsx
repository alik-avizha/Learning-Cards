import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'withText'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCheckbox: Story = {
  args: {
    variant: 'default',
    isChecked: true,
  },
}

export const DisabledCheckbox: Story = {
  args: {
    isChecked: true,
    isDisabled: true,
    variant: 'default',
  },
}

export const CheckboxWithText: Story = {
  args: {
    isChecked: false,
    variant: 'withText',
    checkBoxText: 'Test',
  },
}

export const DisabledCheckboxWithText: Story = {
  args: {
    isChecked: false,
    variant: 'withText',
    isDisabled: true,
    checkBoxText: 'Test',
  },
}
