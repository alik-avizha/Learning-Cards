import { Trash } from '../../../assets'
import { Button, SliderDemo, Table, TabSwitcher, TextField, Typography } from '../../ui'

import s from './packs-list.module.scss'

export const PacksList = () => {
  const tabSwitcherOptions = [
    { id: 1, value: 'My Cards' },
    { id: 2, value: 'All Cards' },
  ]

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'}>Add New Pack</Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField type={'searchType'} className={s.textField} />
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <TabSwitcher
            onChangeCallback={() => {}}
            options={tabSwitcherOptions}
            classname={s.switcher}
          />
        </div>
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <SliderDemo minValue={0} maxValue={10} />
        </div>
        <Button variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <Table />
    </div>
  )
}
