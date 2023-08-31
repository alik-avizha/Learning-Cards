import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'
import { LearnPack } from '@/components/page/learn-pack/learn-pack.tsx'

const meta = {
  title: 'Page/LearnPack',
  component: LearnPack,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof LearnPack>

export default meta
type Story = StoryObj<typeof meta>

export const LearnPackStory: Story = {}
