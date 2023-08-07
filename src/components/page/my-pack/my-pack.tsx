import { useState } from 'react'

import { Link } from 'react-router-dom'

import { ArrowDown, ArrowUp, Back, Edit, Play, SubMenu, Trash } from '../../../assets'
import { useGetCardsQuery, useGetDeckQuery } from '../../../services/cards/cards.ts'
import { useAppSelector } from '../../../services/store.ts'
import {
  Button,
  CheckboxDemo,
  DropDownMenuDemo,
  Modal,
  TableElement,
  TextField,
  Typography,
} from '../../ui'
import { Grade } from '../../ui/grade'

import s from './my-pack.module.scss'

export const MyPack = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [privatePack, setPrivatePack] = useState(false)
  const [question, setQuestion] = useState('')
  const currentSelectorId = useAppSelector(state => state.cardsSlice.id)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const handleOpenDelete = () => {
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={handleOpenEdit}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={handleOpenDelete}>
          <Trash />
          <Typography variant={'caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  const { data } = useGetDeckQuery({
    id: currentSelectorId,
  })

  const { data: dataCards } = useGetCardsQuery({
    id: currentSelectorId,
    question,
  })

  const [sortTable, setSortTable] = useState(false)
  const changeSort = (status: boolean) => setSortTable(status)

  const setSearchByName = (event: string) => {
    setQuestion(event)
  }

  return (
    <div className={s.myPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>{data?.name}</Typography>
          <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
        </div>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
      <TextField
        value={question}
        onChangeText={event => setSearchByName(event)}
        type={'searchType'}
        className={s.textField}
      />
      <TableElement.Root>
        <TableElement.Head>
          <TableElement.Row>
            <TableElement.HeadCell>Question</TableElement.HeadCell>
            <TableElement.HeadCell>Answer</TableElement.HeadCell>
            <TableElement.HeadCell
              onClick={() => {
                changeSort(!sortTable)
              }}
            >
              Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
            </TableElement.HeadCell>
            <TableElement.HeadCell>Grade</TableElement.HeadCell>
            <TableElement.HeadCell></TableElement.HeadCell>
          </TableElement.Row>
        </TableElement.Head>
        <TableElement.Body>
          {dataCards?.items.map(el => {
            return (
              <TableElement.Row key={el.id}>
                <TableElement.Cell>{el.question}</TableElement.Cell>
                <TableElement.Cell>{el.answer}</TableElement.Cell>
                <TableElement.Cell>
                  {new Date(el.updated).toLocaleDateString('ru-RU')}
                </TableElement.Cell>
                <TableElement.Cell>
                  <Grade rating={el.rating} />
                </TableElement.Cell>
                <TableElement.Cell>
                  <div className={s.icons}>
                    <Edit />
                    <Trash />
                  </div>
                </TableElement.Cell>
              </TableElement.Row>
            )
          })}
        </TableElement.Body>
      </TableElement.Root>
      <Modal
        title={'Edite Pack'}
        showCloseButton={true}
        open={openEdit}
        onClose={handleCloseEdit}
        titleButton={'Save Changes'}
      >
        <TextField type={'default'} label={'Name Pack'} placeholder={'name'} />
        <CheckboxDemo
          variant={'withText'}
          checkBoxText={'Private pack'}
          checked={privatePack}
          onChange={() => setPrivatePack(!privatePack)}
        />
      </Modal>
      <Modal
        title={'Delete Pack'}
        showCloseButton={true}
        open={openDelete}
        onClose={handleCloseDelete}
        titleButton={'Save Changes'}
      >
        <Typography variant={'body1'}>
          Do you really want to remove{' '}
          <Typography variant={'subtitle1'} className={s.packName}>
            Pack Name?
          </Typography>{' '}
          <br />
          All cards will be deleted.
        </Typography>
      </Modal>
    </div>
  )
}