import { FC } from 'react'

import { Star } from '../../../assets'

import s from './stars.module.scss'

type PropsType = {
  maxRating?: number
  rating: number
}

export const Stars: FC<PropsType> = ({ maxRating = 5, rating = 0 }) => {
  return (
    <div className={s.sliderBlock}>
      {maxRating > 0 &&
        [...Array(maxRating)].map((_, index) => {
          return (
            <div key={index}>
              <Star active={rating > index} />
            </div>
          )
        })}
    </div>
  )
}
