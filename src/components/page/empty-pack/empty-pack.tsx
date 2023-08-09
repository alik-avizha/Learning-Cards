import { FC, useState } from 'react'

import { Link } from 'react-router-dom'

import { Back } from '../../../assets'
import { useCreateCardMutation } from '../../../services/cards'
import { Button, Modal, TextField, Typography } from '../../ui'

import s from './empty-pack.module.scss'

type PropsType = {
  name?: string
  deckId?: string
}
export const EmptyPack: FC<PropsType> = ({ name, deckId }) => {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [createCard] = useCreateCardMutation()

  const addCardHandler = () => {
    createCard({ id: deckId, question, answer })
    setOpen(false)
  }

  return (
    <div className={s.emptyPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Typography variant={'large'} className={s.title}>
        {name}
      </Typography>
      <Typography variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <div className={s.addNewPackButton}>
        <Button variant={'primary'} onClick={() => setOpen(true)}>
          Add New Card
        </Button>
      </div>
      <Modal
        title={'Add New Card'}
        open={open}
        onClose={() => setOpen(false)}
        titleButton={'Add New Card'}
        showCloseButton={true}
        callBack={addCardHandler}
        disableButton={false}
      >
        <TextField
          type={'default'}
          value={question}
          label={'Question'}
          placeholder={'Question'}
          onChangeText={e => setQuestion(e)}
        />
        <TextField
          type={'default'}
          value={answer}
          label={'Answer'}
          placeholder={'Answer'}
          onChangeText={e => setAnswer(e)}
        />
      </Modal>
    </div>
  )
}
