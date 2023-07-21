import * as Tabs from '@radix-ui/react-tabs'

import { Typography } from '../typography'

import s from './tabSwitcher.module.scss'
export const TabSwitcher = () => {
  const tabsName = [
    { name: 'Switcher', value: 'Button1', isDisabled: false },
    { name: 'Switcher', value: 'Button2', isDisabled: false },
    { name: 'Switcher', value: 'Button3', isDisabled: false },
  ]

  return (
    <Tabs.Root className={s.tabsRoot} defaultValue="tab1">
      <Tabs.List className={s.tabsList} aria-label="Manage your account">
        {tabsName.map((tab, index) => {
          return (
            <Tabs.Trigger
              disabled={tab.isDisabled}
              className={s.tabsTrigger}
              value={tab.value}
              key={index}
            >
              <Typography className={'body1'}>{tab.name}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      {/*<Tabs.Content className={s.tabsContent} value={tab.value}></Tabs.Content>
      <Tabs.Content className={s.tabsContent} value={tab.value}></Tabs.Content>*/}
    </Tabs.Root>
  )
}
