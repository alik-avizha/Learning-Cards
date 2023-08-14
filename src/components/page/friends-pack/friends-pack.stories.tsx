import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'
import { FriendsPack } from '@/components/page/friends-pack/friends-pack.tsx'

const meta = {
  title: 'Page/FriendsPack',
  component: FriendsPack,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof FriendsPack>

export default meta
type Story = StoryObj<typeof meta>

export const FriendsPackStory: Story = {}
