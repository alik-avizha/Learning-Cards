import type { Meta, StoryObj } from '@storybook/react'

import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
} from '../../../common/utils/decorators.tsx'

import { EmptyPack } from './empty-pack.tsx'

const meta = {
  title: 'Page/EmptyPack',
  component: EmptyPack,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof EmptyPack>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyPackStory: Story = {}
