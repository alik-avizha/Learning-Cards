import type { Meta, StoryObj } from '@storybook/react'

import { PagePack } from './page-pack.tsx'

const meta = {
  title: 'Page/PagePack',
  component: PagePack,
  tags: ['autodocs'],
} satisfies Meta<typeof PagePack>

export default meta
type Story = StoryObj<typeof meta>

export const PagePackStory: Story = {}
