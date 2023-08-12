import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Edit, Play, Trash } from '../../../../assets'
import { ResponseUserType } from '../../../../services/auth'
import { DecksResponse } from '../../../../services/decks/types.ts'
import { Button, TableElement } from '../../../ui'
import { HeaderTable } from '../../../ui/table/header-table.tsx'
import { Sort } from '../../../ui/table/type.ts'
import { ModalType } from '../pack-modal'

import s from './table-packs-list.module.scss'

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'created',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'activity',
    title: '',
  },
]

type PropsType = {
  data: DecksResponse | undefined
  authData?: ResponseUserType | null
  setIsMyPackHandler: (isMyPack: boolean) => void
  handleOpen: (typeModal: string) => void
  setPackName: (name: string) => void
  setCardId: (cardId: string) => void
  setOpen: (modalType: ModalType) => void
  open: ModalType
  sort: Sort
  setSort: (value: Sort) => void
}
export const TablePacksList: FC<PropsType> = ({
  data,
  authData,
  setIsMyPackHandler,
  handleOpen,
  setPackName,
  setCardId,
  setOpen,
  open,
  sort,
  setSort,
}) => {
  const onClickNameDeckHandler = (authorId: string) => {
    setIsMyPackHandler(authorId === authData?.id)
  }

  const onEditHandler = (name: string, cardId: string) => {
    handleOpen('editPack')
    setPackName(name)
    setCardId(cardId)
  }

  const onDeleteHandler = (cardId: string) => {
    setOpen({ ...open, deletePack: true })
    setCardId(cardId)
  }

  return (
    <TableElement.Root>
      <HeaderTable columns={columns} sort={sort} onSort={setSort} />
      <TableElement.Body>
        {data?.items.map(el => {
          const lastRoute = () => {
            if (el.author.id === authData?.id) {
              return el.cardsCount !== 0 ? `/my-pack/${el.id}` : `/empty-pack/${el.name}/${el.id}`
            } else {
              return `/friends-pack/${el.id}`
            }
          }

          return (
            <TableElement.Row key={el.id}>
              <TableElement.Cell>
                <Button
                  as={Link}
                  to={lastRoute()}
                  variant={'link'}
                  onClick={() => onClickNameDeckHandler(el.author.id)}
                  className={s.nameOfDeckButton}
                >
                  {el.name}
                </Button>
              </TableElement.Cell>
              <TableElement.Cell>{el.cardsCount}</TableElement.Cell>
              <TableElement.Cell>
                {new Date(el.updated).toLocaleDateString('ru-RU')}
              </TableElement.Cell>
              <TableElement.Cell>{el.author.name}</TableElement.Cell>
              <TableElement.Cell>
                <div className={s.icons}>
                  <Link to={`/learn-pack/${el.id}`}>
                    <Play className={s.icon} />
                  </Link>
                  {el.author.id === authData?.id && (
                    <>
                      <Edit
                        className={s.icon}
                        onClick={() => {
                          onEditHandler(el.name, el.id)
                        }}
                      />
                      <Trash
                        className={s.icon}
                        onClick={() => {
                          onDeleteHandler(el.id)
                        }}
                      />
                    </>
                  )}
                </div>
              </TableElement.Cell>
            </TableElement.Row>
          )
        })}
      </TableElement.Body>
    </TableElement.Root>
  )
}
