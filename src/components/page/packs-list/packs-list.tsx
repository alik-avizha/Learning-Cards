import { useState } from 'react'

import { ArrowDown, ArrowUp, Edit, Play, Trash } from '../../../assets'
import {
  Button,
  CheckboxDemo,
  Modal,
  SliderDemo,
  TableElement,
  TabSwitcher,
  TextField,
  Typography,
} from '../../ui'

import s from './packs-list.module.scss'

type TypeTestData = {
  id: number
  name: string
  cardsNumber: number
  lastDate: string
  createdBy: string
}
export const PacksList = () => {
  const tabSwitcherOptions = [
    { id: 1, value: 'My Cards' },
    { id: 2, value: 'All Cards' },
  ]

  const testData: TypeTestData[] = [
    { id: 1, name: 'Pack Name', cardsNumber: 4, lastDate: '24.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 2, name: 'Pack Name', cardsNumber: 4, lastDate: '25.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 3, name: 'Pack Name', cardsNumber: 4, lastDate: '26.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 4, name: 'Pack Name', cardsNumber: 4, lastDate: '27.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 5, name: 'Pack Name', cardsNumber: 4, lastDate: '28.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 6, name: 'Pack Name', cardsNumber: 4, lastDate: '29.07.2023', createdBy: 'Ivan Ivanov' },
    { id: 7, name: 'Pack Name', cardsNumber: 4, lastDate: '30.07.2023', createdBy: 'Ivan Ivanov' },
  ]

  const [sortTable, setSortTable] = useState(false)
  const [open, setOpen] = useState(false)
  const [privatePack, setPrivatePack] = useState(false)
  const changeSort = (status: boolean) => setSortTable(status)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={handleOpen}>
          Add New Pack
        </Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField type={'searchType'} className={s.textField} />
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <TabSwitcher
            onChangeCallback={() => {}}
            options={tabSwitcherOptions}
            classname={s.switcher}
          />
        </div>
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <SliderDemo minValue={0} maxValue={10} />
        </div>
        <Button variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <TableElement.Root>
        <TableElement.Head>
          <TableElement.Row>
            <TableElement.HeadCell>Name</TableElement.HeadCell>
            <TableElement.HeadCell>Cards</TableElement.HeadCell>
            <TableElement.HeadCell
              onClick={() => {
                changeSort(!sortTable)
              }}
            >
              Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
            </TableElement.HeadCell>
            <TableElement.HeadCell>Created by</TableElement.HeadCell>
            <TableElement.HeadCell></TableElement.HeadCell>
          </TableElement.Row>
        </TableElement.Head>
        <TableElement.Body>
          {testData.map(el => {
            return (
              <TableElement.Row key={el.id}>
                <TableElement.Cell>{el.name}</TableElement.Cell>
                <TableElement.Cell>{el.cardsNumber}</TableElement.Cell>
                <TableElement.Cell>{el.lastDate}</TableElement.Cell>
                <TableElement.Cell>{el.createdBy}</TableElement.Cell>
                <TableElement.Cell>
                  <div className={s.icons}>
                    <Play />
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
        title={'Add New Pack'}
        showCloseButton={true}
        open={open}
        onClose={handleClose}
        titleButton={'Add New Pack'}
      >
        <TextField type={'default'} label={'Name Pack'} placeholder={'name'} />
        <CheckboxDemo
          variant={'withText'}
          checkBoxText={'Private pack'}
          checked={privatePack}
          onChange={() => setPrivatePack(!privatePack)}
        />
      </Modal>
    </div>
  )
}
