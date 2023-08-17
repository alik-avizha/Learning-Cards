import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import { Typography } from '../typography'

import s from './tabSwitcher.module.scss'

type PropsType = {
  classname?: string
  options?: any[]
  onChangeCallback?: (value: string) => void
  activeTab?: string
}
export const TabSwitcher: FC<PropsType> = ({ options, onChangeCallback, classname, activeTab }) => {
  return (
    <div key={activeTab}>
      <Tabs.Root className={s.tabsRoot} onValueChange={onChangeCallback}>
        <Tabs.List className={s.tabsList}>
          {options?.map((tab, index) => {
            return (
              <Tabs.Trigger
                data-state={tab.value === activeTab ? 'active' : ''}
                className={`${s.tabsTrigger} ${classname}`}
                value={tab.value}
                key={index}
              >
                <Typography className={'body1'}>{tab.value}</Typography>
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}
