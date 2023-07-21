import { Button } from './components/ui/button'
import { TextField } from './components/ui/textfield'

export function App() {
  return (
    <div>
      <Button variant={'primary'} as={'a'} href={'/link'}>
        Hello
      </Button>
      <TextField type={'default'} />
      <TextField type={'search'} />
      <TextField type={'password'} />
    </div>
  )
}
