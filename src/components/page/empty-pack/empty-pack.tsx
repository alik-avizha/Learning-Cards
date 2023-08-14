import { useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './empty-pack.module.scss'

import { Back } from '@/assets'
import { Button, Modal, TextField, Typography } from '@/components/ui'
import { useCreateCardMutation } from '@/services/cards'

export const EmptyPack = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string; name: string }>()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const [createCard] = useCreateCardMutation()

  const addCardHandler = () => {
    createCard({ id: params.id, question, answer })
    navigate(`/my-pack/${params.id}`)
  }

  return (
    <div className={s.emptyPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Typography variant={'large'} className={s.title}>
        {params.name}
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
