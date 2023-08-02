import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '../../common/utils/decorators.tsx'

import { Routing } from './routing.tsx'

const meta = {
  title: 'App',
  component: Routing,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} satisfies Meta<typeof Routing>

export default meta

type Story = StoryObj<typeof meta>

export const RoutingStory: Story = {}
