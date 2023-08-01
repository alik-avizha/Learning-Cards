import { Back, SubMenu } from '../../../assets'
import { Button, Table, TextField, Typography } from '../../ui'

import s from './friends-pack.module.scss'

export const FriendsPack = () => {
  return (
    <div className={s.packListBlock}>
      <Button variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>Packs list</Typography>
          <SubMenu />
        </div>
        <Button variant={'primary'}>Add New Pack</Button>
      </div>
      <TextField type={'searchType'} className={s.textField} />
      <Table />
    </div>
  )
}
