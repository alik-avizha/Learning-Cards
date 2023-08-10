import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../../assets'
import { useGetCardsQuery } from '../../../services/cards'
import { useGetDeckQuery } from '../../../services/decks'
import { Button, TextField, Typography } from '../../ui'

import s from './friends-pack.module.scss'
import { FriendsTable } from './friends-table'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()
  const [sortTable, setSortTable] = useState(false)
  const { data } = useGetDeckQuery({
    id: params.id,
  })

  const { data: dataCards } = useGetCardsQuery({
    id: params.id,
  })
  const changeSort = (status: boolean) => setSortTable(status)

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
        <Button variant={'primary'}>Learn to Pack</Button>
      </div>
      <TextField type={'searchType'} className={s.textField} />
      <FriendsTable setSortTable={changeSort} sortTable={sortTable} dataCards={dataCards} />
    </div>
  )
}
