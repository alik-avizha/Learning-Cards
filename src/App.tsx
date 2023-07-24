import { Button } from './components/ui/button'
import { Header } from './components/ui/header'
import { TabSwitcher } from './components/ui/tabSwitcher'
import { TextField } from './components/ui/textfield'

export function App() {
  return (
    <div>
      <Header isAuth={true} />
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
