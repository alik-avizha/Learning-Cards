import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../../assets'
import { useGetCardsQuery } from '../../../services/cards'
import { useGetDeckQuery } from '../../../services/decks'
import { useAppSelector } from '../../../services/store.ts'
import { Button, Pagination, TextField, Typography } from '../../ui'
import { SelectRadix } from '../../ui/select/selectRadix.tsx'
import { Sort } from '../../ui/table/type.ts'

import s from './friends-pack.module.scss'
import { FriendsTable } from './friends-table'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()
  const [search, setSearch] = useState('')
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [page, setPage] = useState(currentPage)

  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }

  const { data } = useGetDeckQuery({
    id: params.id,
  })

  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data: dataCards } = useGetCardsQuery({
    id: params.id,
    orderBy: sortedString,
    question: search,
    itemsPerPage: perPage.value,
    currentPage: page,
  })

  return (
    <div className={s.friendsPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>{data?.name}</Typography>
        </div>
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'primary'}>
          Learn to Pack
        </Button>
      </div>
      <TextField
        value={search}
        onChangeText={e => setSearch(e)}
        type={'searchType'}
        className={s.textField}
      />
      <FriendsTable sort={sort} setSort={setSort} dataCards={dataCards} />
      <div className={s.pagination}>
        <Pagination count={dataCards?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'body2'}>Показать</Typography>
        <SelectRadix
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
