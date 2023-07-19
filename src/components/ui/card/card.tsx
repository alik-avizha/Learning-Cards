import { FC, ReactNode } from 'react'

import s from './card.module.scss'
type CardProps = {
  children: ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
  return <div className={s.cardBlock}>{children}</div>
}
