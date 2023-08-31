import { FC } from 'react'

import s from './grade.module.scss'

import { Star } from '@/assets'

type PropsType = {
  maxRating?: number
  rating: number
}

export const Grade: FC<PropsType> = ({ maxRating = 5, rating = 0 }) => {
  return (
    <div className={s.sliderBlock}>
      {maxRating > 0 &&
        [...Array(maxRating)].map((_, index) => {
          return (
            <div key={index} className={s.star}>
              <Star active={rating > index ? 'active' : ''} />
            </div>
          )
        })}
    </div>
  )
}
