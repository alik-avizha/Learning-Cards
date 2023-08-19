import { useState } from 'react'

import s from './packs-list.module.scss'

import { Trash } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { AddEditPackModal, DeletePackCardModal } from '@/components/page/common/modals'
import { usePackDeckState } from '@/components/page/packs-list/hook'
import { TablePacksList } from '@/components/page/packs-list/table-packs-list'
import {
  Button,
  Pagination,
  SliderDemo,
  SuperSelect,
  TabSwitcher,
  TextField,
  Typography,
} from '@/components/ui'
import { useMeQuery } from '@/services/auth'
import { cardsSlice } from '@/services/cards'
import {
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { deckSlice } from '@/services/decks/deck.slice.ts'
import { modalActions, selectOpen, selectPackSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const PacksList = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const tabSwitcherOptions = useAppSelector(state => state.deckSlice.tabSwitcherOptions)
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPagePackList)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPagePackList)
  const open = useAppSelector(selectOpen)
  const { privatePack, packName, img } = useAppSelector(selectPackSettings)

  const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)
  const dispatch = useAppDispatch()

  const {
    cardId,
    setCardId,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    setValueSlider,
    valueSlider,
  } = usePackDeckState(sliderValues)

  const newInitialName = useDebounce(initialName, 1000)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: itemsPerPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPagePackList(page))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPackListPerPage(value))
  }
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }
  const handleTabSort = (value: string) => {
    setActiveTab(value)
    if (value === 'My Cards') {
      setUserId(meData!.id)
    } else {
      setUserId('')
    }
  }
  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All cards')
    setActiveTab('All Cards')
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }
  const addOrEditPack = () => {
    if (open === 'addPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))

      img && formData.append('cover', img)
      createDeck(formData)
    } else if (open === 'editPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))

      img && formData.append('cover', img)
      editDeck({ id: cardId, formData })
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deletePack = () => {
    deleteDeck({ id: cardId })
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addPack'))
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={setOpen}>
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
            activeTab={activeTab}
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
        <Button variant={'secondary'} onClick={clearFilterData}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <TablePacksList
        data={data}
        authData={meData}
        setIsMyPackHandler={setIsMyPackHandler}
        setCardId={setCardId}
        sort={sort}
        setSort={setSort}
      />
      <div className={s.pagination}>
        <Pagination
          count={data?.pagination.totalPages}
          page={currentPage}
          onChange={setNewCurrentPage}
        />
        <Typography variant={'body2'}>Показать</Typography>
        <SuperSelect
          options={options}
          defaultValue={itemsPerPage.value}
          onValueChange={setNewPerPage}
          classname={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
      <AddEditPackModal onSubmit={addOrEditPack} />
      <DeletePackCardModal onSubmit={deletePack} />
    </div>
  )
}
