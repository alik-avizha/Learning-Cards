import { useMemo, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './my-pack.module.scss'

import { Back, Edit, Play, SubMenu, Trash } from '@/assets'
import { TableModal } from '@/components/page/common/modals'
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
import { modalActions, NameModal, selectOpenModals, selectSettings } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const MyPack = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { privatePack, packName, question, answer } = useAppSelector(selectSettings)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const { editPack, deletePack, addCard, editCard, deleteCard } = useAppSelector(selectOpenModals)
  const dispatch = useAppDispatch()

  const [cardId, setCardId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [page, setPage] = useState(currentPage)

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
    itemsPerPage: perPage.value,
    currentPage: page,
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
  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }
  const addCardModalHandler = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }
  const onHandlerActionClicked = (value: NameModal) => {
    if (addCard) {
      createCard({ id: params.id, question, answer })
    } else if (editCard) {
      editItem({ id: cardId, question, answer })
        .unwrap()
        .then(() => toast.success('Карточка успешна обновлена'))
        .catch(() => {
          toast.error('Some error')
        })
    } else if (deleteCard) {
      deleteItem({ id: cardId })
    } else if (editPack) {
      editDeck({ id: cardId, name: packName, isPrivate: privatePack })
        .unwrap()
        .then(() => {
          toast.success('Колода успешно обновлена')
        })
        .catch(() => {
          toast.error('Some error')
        })
    } else if (deletePack) {
      deleteDeck({ id: cardId })
        .unwrap()
        .then(() => {
          toast.success('Карта успешно удалена')
        })
        .catch(() => {
          toast.error('Some error')
        })

      navigate('/')
    }
    dispatch(modalActions.setCloseModal(value))
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
        <div className={s.titleMenu}>
          <Typography variant={'large'}>{data?.name}</Typography>
          <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
        </div>
        <Button variant={'primary'} onClick={addCardModalHandler}>
          Add New Card
        </Button>
      </div>
      <TextField
        value={search}
        onChangeText={event => setSearch(event)}
        type={'searchType'}
        className={s.textField}
      />
      <MyPackTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
      <TableModal handleClicked={onHandlerActionClicked} />
      <div className={s.pagination}>
        <Pagination count={dataCards?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'body2'}>Показать</Typography>
        <SuperSelect
          options={options}
          defaultValue={perPage.value}
          onValueChange={onSetPerPageHandler}
          classname={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
    </div>
  )
}
