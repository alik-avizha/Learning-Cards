import type { Meta, StoryObj } from '@storybook/react'

import { MyPack } from './my-pack.tsx'

const meta = {
  title: 'Page/MyPack',
  component: MyPack,
  tags: ['autodocs'],
} satisfies Meta<typeof MyPack>

export default meta
type Story = StoryObj<typeof meta>

export const MyPackStory: Story = {}
