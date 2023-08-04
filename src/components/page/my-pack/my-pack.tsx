import { useState } from 'react'

import { ArrowDown, ArrowUp, Back, Edit, Play, SubMenu, Trash } from '../../../assets'
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

type TestDataType = {
  id: number
  question: string
  answer: string
  lastDate: string
  grade: JSX.Element
}
export const MyPack = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [privatePack, setPrivatePack] = useState(false)

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

  const [sortTable, setSortTable] = useState(false)
  const changeSort = (status: boolean) => setSortTable(status)

  const testData: TestDataType[] = [
    {
      id: 1,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 2,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 3,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 4,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 5,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 6,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 7,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 8,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 9,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
    {
      id: 10,
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      lastDate: '24.07.2023',
      grade: <Grade rating={4} />,
    },
  ]

  return (
    <div className={s.packListBlock}>
      <Button variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>My Pack</Typography>
          <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
        </div>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
      <TextField type={'searchType'} className={s.textField} />
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
          {testData.map(el => {
            return (
              <TableElement.Row key={el.id}>
                <TableElement.Cell>{el.question}</TableElement.Cell>
                <TableElement.Cell>{el.answer}</TableElement.Cell>
                <TableElement.Cell>{el.lastDate}</TableElement.Cell>
                <TableElement.Cell>{el.grade}</TableElement.Cell>
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
          Do you really want to remove Pack Name? All cards will be deleted.
        </Typography>
      </Modal>
    </div>
  )
}
