import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'

import { Card } from './'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCard: Story = {
  args: {
    children: (
      <>
        <a href="">Ссылка</a>
        <Button variant={'primary'} />
      </>
    ),
  },
}
