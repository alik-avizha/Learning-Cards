import { Trash } from '../../../assets'
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
import { Button, Pagination, SliderDemo, TabSwitcher, TextField, Typography } from '../../ui'
import { SelectRadix } from '../../ui/select/selectRadix.tsx'

import { usePackDeckState } from './hook'
import { PackModal } from './pack-modal'
import s from './packs-list.module.scss'
import { TablePacksList } from './table-packs-list'

export const PacksList = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const tabSwitcherOptions = useAppSelector(state => state.deckSlice.tabSwitcherOptions)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)

  const dispatch = useAppDispatch()

  const newInitialName = useDebounce(initialName, 1000)

  const {
    packName,
    setPackName,
    open,
    setOpen,
    cardId,
    setCardId,
    privatePack,
    setPrivatePack,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    page,
    setPage,
    setValueSlider,
    valueSlider,
    perPage,
    onSetPerPageHandler,
  } = usePackDeckState('', sliderValues, currentPage, itemsPerPage)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: perPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage: page,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

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
          <SliderDemo
            value={valueSlider}
            setValue={setValueSlider}
            maxValue={data?.maxCardsCount}
          />
        </div>
        <Button variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <TablePacksList
        data={data}
        authData={meData}
        setIsMyPackHandler={setIsMyPackHandler}
        handleOpen={handleOpen}
        setPackName={setPackName}
        setCardId={setCardId}
        setOpen={setOpen}
        open={open}
        sort={sort}
        setSort={setSort}
      />
      <div className={s.pagination}>
        <Pagination count={data?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'body2'}>Показать</Typography>
        <SelectRadix
          options={options}
          defaultValue={perPage.value}
          onValueChange={onSetPerPageHandler}
          classname={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
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
