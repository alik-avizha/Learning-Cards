import type { Meta, StoryObj } from '@storybook/react'

import AvatarDefault from '../../../assets/icons/avatar-default.svg'

import { AvatarDemo } from '@/components/ui/avatar/avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: AvatarDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: AvatarDefault,
  },
}
