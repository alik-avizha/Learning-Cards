import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './tabSwitcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const ShowTabSwitcher: Story = {}
