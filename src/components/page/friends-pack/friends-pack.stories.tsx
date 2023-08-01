import type { Meta, StoryObj } from '@storybook/react'

import { FriendsPack } from './friends-pack.tsx'

const meta = {
  title: 'Page/FriendsPack',
  component: FriendsPack,
  tags: ['autodocs'],
} satisfies Meta<typeof FriendsPack>

export default meta
type Story = StoryObj<typeof meta>

export const FriendsPackStory: Story = {}
