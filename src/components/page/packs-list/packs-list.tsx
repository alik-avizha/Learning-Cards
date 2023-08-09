import { Link } from 'react-router-dom'

import { ArrowDown, ArrowUp, Edit, Play, Trash } from '../../../assets'
import useDebounce from '../../../common/hooks/use-debounce.ts'
import { useMeQuery } from '../../../services/auth'
import { cardsSlice } from '../../../services/cards'
import {
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '../../../services/decks'
import { deckSlice } from '../../../services/decks/deck.slice.ts'
import { useAppDispatch, useAppSelector } from '../../../services/store.ts'
import { Button, SliderDemo, TableElement, TabSwitcher, TextField, Typography } from '../../ui'

import { usePackDeckState } from './hook'
import { PackModal } from './pack-modal'
import s from './packs-list.module.scss'

export const PacksList = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)

  const dispatch = useAppDispatch()

  const tabSwitcherOptions = [
    { id: 1, value: 'My Cards' },
    { id: 2, value: 'All Cards' },
  ]
  const newInitialName = useDebounce(initialName, 1000)

  const {
    packName,
    setPackName,
    sortTable,
    setSortTable,
    open,
    setOpen,
    cardId,
    setCardId,
    privatePack,
    setPrivatePack,
    userId,
    setUserId,
  } = usePackDeckState('', false)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortTable ? 'created-asc' : 'created-desc',
    itemsPerPage: 10,
    authorId: userId,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const changeSort = (status: boolean) => setSortTable(status)
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const onHandlerActionClicked = () => {
    ;(open.addNewPack && createDeck({ name: packName })) ||
      (open.editPack && editDeck({ id: cardId, name: packName })) ||
      (open.deletePack && deleteDeck({ id: cardId }))

    setOpen({ ...open, addNewPack: false, editPack: false, deletePack: false })
    setPackName('')
  }
  const handleOpen = (value: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [value]: true,
    }))
  }
  const handleClose = (value: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [value]: false,
    }))
    setPackName('')
  }
  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }
  const handleTabSort = (value: string) => {
    if (value === 'My Cards') {
      setUserId(meData!.id)
    } else {
      setUserId('')
    }
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={() => handleOpen('addNewPack')}>
          Add New Pack
        </Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField
          value={initialName}
          type={'searchType'}
          className={s.textField}
          onChangeText={event => setSearchByName(event)}
          onSearchClear={() => setSearchByName('')}
        />
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <TabSwitcher
            onChangeCallback={value => handleTabSort(value)}
            options={tabSwitcherOptions}
            classname={s.switcher}
            defaultValue={tabSwitcherOptions[1].value}
          />
        </div>
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Number of cards
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
            <TableElement.HeadCell onClick={() => changeSort(!sortTable)}>
              Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
            </TableElement.HeadCell>
            <TableElement.HeadCell>Created by</TableElement.HeadCell>
            <TableElement.HeadCell></TableElement.HeadCell>
          </TableElement.Row>
        </TableElement.Head>
        <TableElement.Body>
          {data?.items.map(el => {
            return (
              <TableElement.Row key={el.id}>
                <TableElement.Cell>
                  <Button
                    as={Link}
                    to={`/my-pack/${el.id}`}
                    variant={'link'}
                    onClick={() => setIsMyPackHandler(el.author.id === meData?.id)}
                    className={s.nameOfDeckButton}
                  >
                    {el.name}
                  </Button>
                </TableElement.Cell>
                <TableElement.Cell>{el.cardsCount}</TableElement.Cell>
                <TableElement.Cell>
                  {new Date(el.created).toLocaleDateString('ru-RU')}
                </TableElement.Cell>
                <TableElement.Cell>{el.author.name}</TableElement.Cell>
                <TableElement.Cell>
                  <div className={s.icons}>
                    <Play className={s.icon} />
                    {el.author.id === meData?.id && (
                      <>
                        <Edit
                          className={s.icon}
                          onClick={() => {
                            handleOpen('editPack')
                            setPackName(el.name)
                            setCardId(el.id)
                          }}
                        />
                        <Trash
                          className={s.icon}
                          onClick={() => {
                            setOpen({ ...open, deletePack: true })
                            setCardId(el.id)
                          }}
                        />
                      </>
                    )}
                  </div>
                </TableElement.Cell>
              </TableElement.Row>
            )
          })}
        </TableElement.Body>
      </TableElement.Root>
      <PackModal
        open={open}
        packName={packName}
        handleClose={handleClose}
        onHandlerActionClicked={onHandlerActionClicked}
        setPackName={setPackName}
        privatePack={privatePack}
        setPrivatePack={setPrivatePack}
      />
    </div>
  )
}
