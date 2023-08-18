import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './friends-pack.module.scss'
import { FriendsTable } from './friends-table'

import { Back } from '@/assets'
import { Button, Pagination, SuperSelect, TextField, Typography } from '@/components/ui'
import { Loader } from '@/components/ui/loader/loader.tsx'
import { Sort } from '@/components/ui/table/type.ts'
import { useGetCardsQuery } from '@/services/cards'
import { useGetDeckQuery } from '@/services/decks'
import { deckSlice } from '@/services/decks/deck.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()

  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPageFriendsPack)
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPageFriendsPack(page))
  }
  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards, isLoading } = useGetCardsQuery({
    id: params.id,
    orderBy: sortedString,
    question: search,
    itemsPerPage: perPage.value,
    currentPage: currentPage,
  })

  if (isLoading) return <Loader />

  return (
    <div className={s.friendsPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleAndCover}>
          <div className={s.titleMenu}>
            <Typography variant={'large'}>{data?.name}</Typography>
          </div>
          {data?.cover && <img src={data.cover} alt="cover" className={s.cover} />}
        </div>
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'primary'}>
          Learn to Pack
        </Button>
      </div>
      <TextField
        value={search}
        onChangeText={e => setSearch(e)}
        onSearchClear={() => setSearch('')}
        type={'searchType'}
        className={s.textField}
      />
      <FriendsTable sort={sort} setSort={setSort} dataCards={dataCards} />
      <div className={s.pagination}>
        <Pagination
          count={dataCards?.pagination.totalPages}
          page={currentPage}
          onChange={setNewCurrentPage}
        />
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
