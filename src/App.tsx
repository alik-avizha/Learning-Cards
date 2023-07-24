import { useState } from 'react'

import { Button } from './components/ui/button'
import { CheckboxDemo } from './components/ui/checkbox'
import { Header } from './components/ui/header'
import { Modal } from './components/ui/modal'
import { RadioGroupDemo } from './components/ui/radioGroup'
import { TabSwitcher } from './components/ui/tabSwitcher'
import { TextField } from './components/ui/textfield'
import { Typography } from './components/ui/typography'

export function App() {
  const [modal, setModal] = useState(false)

  return (
    <div>
      <Header isAuth={true} />
      <Button variant={'primary'} as={'a'} href={'/link'}>
        Hello
      </Button>
      <Button variant={'primary'} onClick={() => setModal(!modal)}>
        Modal
      </Button>
      <TabSwitcher />
      <TextField type={'default'} />
      <TextField type={'password'} />
      <TextField type={'searchType'} />
      {modal && (
        <Modal isOpenModal={modal}>
          <TextField type={'searchType'} />
          <TextField type={'default'} />
          <CheckboxDemo variant={'default'} />
          <Typography variant={'body1'}> Hello There!</Typography>
          <RadioGroupDemo />
        </Modal>
      )}
    </div>
  )
}
