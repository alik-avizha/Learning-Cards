import { Avatar } from '../../../../assets'
import { Typography } from '../../typography'

import s from './profile-block.module.scss'

export const ProfileBlock = () => {
  return (
    <div className={s.infoBlock}>
      <Avatar />
      <div className={s.info}>
        <Typography variant={'subtitle2'}>Name</Typography>
        <Typography variant={'caption'} className={s.email}>
          egor.belozerov@mail.ru
        </Typography>
      </div>
    </div>
  )
}
