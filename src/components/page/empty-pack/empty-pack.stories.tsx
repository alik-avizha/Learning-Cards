import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'
import { EmptyPack } from '@/components/page/empty-pack/empty-pack.tsx'

const meta = {
  title: 'Page/EmptyPack',
  component: EmptyPack,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof EmptyPack>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyPackStory: Story = {}
