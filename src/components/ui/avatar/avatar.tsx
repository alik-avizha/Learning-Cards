import { ComponentProps, FC } from 'react'

import * as Avatar from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

export type AvatarProps = {
  name?: string
  src?: ComponentProps<'img'>['src']
  className?: string
}

export const AvatarDemo: FC<AvatarProps> = ({ name, src, className }) => (
  <Avatar.Root className={`${s.AvatarRoot} ${className}`}>
    {src ? (
      <Avatar.Image className={s.AvatarImage} src={src} alt={name} />
    ) : (
      <Avatar.Fallback className="AvatarFallback">{name?.[0]}</Avatar.Fallback>
    )}
  </Avatar.Root>
)
