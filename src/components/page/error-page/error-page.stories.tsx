import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/common'
import { ErrorPage } from '@/components/page/error-page/error-page.tsx'

const meta = {
  title: 'Page/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorPageStory: Story = {}
