import { Back, Edit, Play, SubMenu, Trash } from '../../../assets'
import { Button, DropDownMenuDemo, Table, TextField, Typography } from '../../ui'

import s from './friends-pack.module.scss'

export const FriendsPack = () => {
  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Trash />
          <Typography variant={'caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  return (
    <div className={s.packListBlock}>
      <Button variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>Packs list</Typography>
          <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
        </div>
        <Button variant={'primary'}>Add New Pack</Button>
      </div>
      <TextField type={'searchType'} className={s.textField} />
      <Table />
    </div>
  )
}
