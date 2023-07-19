import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { Typography } from '../typography'

import s from './radioGroup.module.scss'

type RadioGroupProps = {
  isDisabled?: boolean
}
export const RadioGroupDemo: FC<RadioGroupProps> = ({ isDisabled = false }) => (
  /*Не сделано контролируемое состояние радио, первый захардкоджен*/

  <form>
    <RadioGroup.Root className={s.radioGroupRoot} defaultValue="default" aria-label="View density">
      <div className={s.itemGroup}>
        <RadioGroup.Item className={s.radioGroupItem} disabled value="default" id="r1">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={`${s.label} ${s.labelDisabled}`} htmlFor="r1">
          <Typography variant={'body2'}>Default</Typography>
        </label>
      </div>
      <div className={s.itemGroup}>
        <RadioGroup.Item className={s.radioGroupItem} value="comfortable" id="r2">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor="r2">
          <Typography variant={'body2'}>Comfortable</Typography>
        </label>
      </div>
      <div className={s.itemGroup}>
        <RadioGroup.Item className={s.radioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor="r3">
          <Typography variant={'body2'}>Compact</Typography>
        </label>
      </div>
    </RadioGroup.Root>
  </form>
)
