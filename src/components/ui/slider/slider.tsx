import { FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import { Typography } from '../typography'

import s from './slider.module.scss'

type SliderPropsType = {
  minValue: number
  maxValue: number
}

export const SliderDemo: FC<SliderPropsType> = ({ minValue = 0, maxValue = 100 }) => {
  const [value, setValue] = useState<number[]>([minValue, maxValue])
  const onChangeValueHandler = (valueNew: number[]) => {
    setValue(valueNew)
  }

  return (
    <div className={s.sliderBlock}>
      <div className={s.countBlock}>
        <Typography variant={'body1'}>{value[0]}</Typography>
      </div>
      <Slider.Root
        className={s.sliderRoot}
        onValueChange={onChangeValueHandler}
        defaultValue={value}
        max={maxValue}
        step={1}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} aria-label="Volume" />
        <Slider.Thumb className={s.sliderThumb} aria-label="Volume" />
      </Slider.Root>
      <div className={s.countBlock}>
        <Typography variant={'body1'}>{value[1]}</Typography>
      </div>
    </div>
  )
}
