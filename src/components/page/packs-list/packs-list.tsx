import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './packs-list.module.scss'

import { Trash } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { useMutationWithToast } from '@/common/hooks/useMutationWithToast.ts'
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
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.packList)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.packList)
  const open = useAppSelector(selectOpen)
  const { privatePack, packName, img } = useAppSelector(selectPackSettings)
  const hookWithToast = useMutationWithToast()
  const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

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
    dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'packList', newCurrentPage: value }))
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
      dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: 1 }))
    } else {
      setUserId('')
    }
  }
  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All Cards')
    setActiveTab('All Cards')
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }
  const addOrEditPack = async () => {
    if (open === 'addPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(createDeck(formData), t('pack-list.toastSuccessAddDeck'))
    } else if (open === 'editPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(editDeck({ id: cardId, formData }), t('pack-list.toastSuccessEditDeck'))
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deletePack = async () => {
    await hookWithToast(deleteDeck({ id: cardId }), t('pack-list.toastSuccessEditDelete'))

    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addPack'))
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>{t('pack-list.title')}</Typography>
        <Button variant={'primary'} onClick={setOpen}>
          {t('pack-list.addNewPack')}
        </Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField
          value={initialName}
          placeholder={t('pack-list.inputPlaceholder')}
          type={'searchType'}
          className={s.textField}
          onChangeText={event => setSearchByName(event)}
          onSearchClear={() => setSearchByName('')}
        />
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            {t('pack-list.showPacksCards')}
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
            {t('pack-list.numberOfCards')}
          </Typography>
          <SliderDemo
            value={valueSlider}
            setValue={setValueSlider}
            maxValue={data?.maxCardsCount}
          />
        </div>
        <Button variant={'secondary'} onClick={clearFilterData}>
          <Trash />
          {t('pack-list.clearFilter')}
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
        <Typography variant={'body2'}>{t('pack-list.show')}</Typography>
        <SuperSelect
          options={options}
          defaultValue={itemsPerPage.value}
          onValueChange={setNewPerPage}
          classname={s.selectPagination}
        />
        <Typography variant={'body2'}>{t('pack-list.onThePage')}</Typography>
      </div>
      <AddEditPackModal onSubmit={addOrEditPack} />
      <DeletePackCardModal onSubmit={deletePack} />
    </div>
  )
}
