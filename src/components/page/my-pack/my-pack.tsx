import { useMemo, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './my-pack.module.scss'

import { Back, Edit, Play, SubMenu, Trash } from '@/assets'
import { useMutationWithToast } from '@/common'
import {
  AddEditCardModal,
  AddEditPackModal,
  DeletePackCardModal,
} from '@/components/page/common/modals'
import { MyPackTable } from '@/components/page/my-pack/my-pack-table/my-pack-table.tsx'
import {
  Button,
  DropDownMenuDemo,
  Pagination,
  SuperSelect,
  TextField,
  Typography,
} from '@/components/ui'
import { Loader } from '@/components/ui/loader/loader.tsx'
import { Sort } from '@/components/ui/table/type.ts'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useGetCardsQuery,
} from '@/services/cards'
import { useDeletedDeckMutation, useGetDeckQuery, useUpdateDeckMutation } from '@/services/decks'
import { deckSlice } from '@/services/decks/deck.slice.ts'
import {
  modalActions,
  NameModal,
  selectCardSettings,
  selectOpen,
  selectPackSettings,
} from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const MyPack = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { privatePack, packName, img } = useAppSelector(selectPackSettings)
  const { question, answer, questionImg, answerImg } = useAppSelector(selectCardSettings)
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.myPack)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.myPack)
  const open = useAppSelector(selectOpen)
  const hookWithToast = useMutationWithToast()
  const dispatch = useAppDispatch()

  const [cardId, setCardId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards, isLoading } = useGetCardsQuery({
    id: params.id,
    question: search,
    orderBy: sortedString,
    itemsPerPage: itemsPerPage.value,
    currentPage: currentPage,
  })
  const [createCard] = useCreateCardMutation()
  const [editItem] = useEditCardMutation()
  const [deleteItem] = useDeleteCardMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const openPackModal = (value: NameModal) => {
    dispatch(modalActions.setOpenModal(value))
    dispatch(modalActions.setPackName(data!.name))
    dispatch(modalActions.setPrivatePack(data!.isPrivate))
    setCardId(data!.id)
  }
  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPage({ value: 'myPack', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'myPack', newCurrentPage: value }))
  }
  const addCardModalHandler = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }
  const addOrEditCard = () => {
    if (open === 'addCard') {
      const formData = new FormData()

      formData.append('question', question)
      formData.append('answer', answer)
      questionImg && formData.append('questionImg', questionImg)
      answerImg && formData.append('answerImg', answerImg)

      hookWithToast(createCard({ id: params.id, formData }), 'Карта успешно добавлена')
    } else if (open === 'editCard') {
      const formData = new FormData()

      formData.append('question', question)
      formData.append('answer', answer)
      questionImg && formData.append('questionImg', questionImg)
      answerImg && formData.append('answerImg', answerImg)

      hookWithToast(editItem({ id: cardId, formData }), 'Карта успешно обновлена')
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deleteCardOrPack = () => {
    if (open === 'deleteCard') {
      hookWithToast(deleteItem({ id: cardId }), 'Карта успешно удалена')
    } else if (open === 'deletePack') {
      hookWithToast(deleteDeck({ id: cardId }), 'Колода успешно удалена').then(() => {
        navigate('/')
      })
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const editPack = () => {
    const formData = new FormData()

    formData.append('name', packName)
    formData.append('isPrivate', String(privatePack))
    img && formData.append('cover', img)

    hookWithToast(editDeck({ id: cardId, formData }), 'Колода успешно обновлена')

    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={() => openPackModal('editPack')}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button
          variant={'link'}
          className={s.buttonDrop}
          onClick={() => openPackModal('deletePack')}
        >
          <Trash />
          <Typography variant={'caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  if (isLoading) return <Loader />

  return (
    <div className={s.myPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleAndCover}>
          <div className={s.titleMenu}>
            <Typography variant={'large'}>{data?.name}</Typography>
            <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
          </div>
          {data?.cover && <img src={data.cover} alt="cover" className={s.cover} />}
        </div>
        <Button variant={'primary'} onClick={addCardModalHandler}>
          Add New Card
        </Button>
      </div>
      <TextField
        value={search}
        placeholder={'Type to find...'}
        onChangeText={event => setSearch(event)}
        onSearchClear={() => setSearch('')}
        type={'searchType'}
        className={s.textField}
      />
      <MyPackTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
      <AddEditCardModal onSubmit={addOrEditCard} />
      <AddEditPackModal onSubmit={editPack} />
      <DeletePackCardModal onSubmit={deleteCardOrPack} />
      <div className={s.pagination}>
        <Pagination
          count={dataCards?.pagination.totalPages}
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
    </div>
  )
}
