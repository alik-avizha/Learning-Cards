import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export const RadioGroupDemo = () => (
  <form>
    <RadioGroup.Root className={s.radioGroupRoot} defaultValue="default" aria-label="View density">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.radioGroupItem} value="default" id="r1">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.label} htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.radioGroupItem} value="comfortable" id="r2">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.label} htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.radioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={s.radioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.label} htmlFor="r3">
          Compact
        </label>
      </div>
    </RadioGroup.Root>
  </form>
)
