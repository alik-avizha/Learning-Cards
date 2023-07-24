import { Button } from './components/ui/button'
import { TabSwitcher } from './components/ui/tabSwitcher'
import { TextField } from './components/ui/textfield'

export function App() {
  return (
    <div>
      <Button variant={'primary'} as={'a'} href={'/link'}>
        Hello
      </Button>
      <TabSwitcher />
      <TextField type={'default'} />
      <TextField type={'password'} />

      <TextField type={'searchType'} />
    </div>
  )
}
