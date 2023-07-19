import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'
export const TabSwitcher = () => {
  const tabsName = [
    { name: 'My cards', value: 'Button1' },
    { name: 'All cards', value: 'Button2' },
  ]

  return (
    <Tabs.Root className={s.tabsRoot} defaultValue="tab1">
      <Tabs.List className={s.tabsList} aria-label="Manage your account">
        {tabsName.map((tab, index) => {
          return (
            <Tabs.Trigger className={s.tabsTrigger} value={tab.value} key={index}>
              {tab.name}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      <Tabs.Content className={s.tabsContent} value="tab1"></Tabs.Content>
      <Tabs.Content className={s.tabsContent} value="tab2"></Tabs.Content>
    </Tabs.Root>
  )
}
