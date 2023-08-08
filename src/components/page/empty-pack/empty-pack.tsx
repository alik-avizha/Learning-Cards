import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Back } from '../../../assets'
import { Button, Typography } from '../../ui'

import s from './empty-pack.module.scss'

type PropsType = {
  name?: string
}
export const EmptyPack: FC<PropsType> = ({ name }) => {
  return (
    <div className={s.emptyPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Typography variant={'large'} className={s.title}>
        {name}
      </Typography>
      <Typography variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <div className={s.addNewPackButton}>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
    </div>
  )
}
