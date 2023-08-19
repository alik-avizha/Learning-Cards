import { FC } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './table-packs-list.module.scss'

import { Edit, Play, Trash } from '@/assets'
import { Button, TableElement } from '@/components/ui'
import { HeaderTable } from '@/components/ui/table/header-table.tsx'
import { Sort } from '@/components/ui/table/type.ts'
import { ResponseUserType } from '@/services/auth'
import { DecksResponse } from '@/services/decks/types.ts'
import { modalActions } from '@/services/modal'
import { useAppDispatch } from '@/services/store.ts'

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
  setCardId: (cardId: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}
export const TablePacksList: FC<PropsType> = ({
  data,
  authData,
  setIsMyPackHandler,
  setCardId,
  sort,
  setSort,
}) => {
  const dispatch = useAppDispatch()
  const onClickNameDeckHandler = (authorId: string) => {
    setIsMyPackHandler(authorId === authData?.id)
  }

  const onEditHandler = (
    name: string,
    cardId: string,
    isPrivate: boolean,
    img: string | undefined
  ) => {
    dispatch(modalActions.setOpenModal('editPack'))
    dispatch(modalActions.setPackName(name))
    dispatch(modalActions.setPrivatePack(isPrivate))
    dispatch(modalActions.setEditImg(img))
    setCardId(cardId)
  }

  const onDeleteHandler = (name: string, cardId: string) => {
    dispatch(modalActions.setOpenModal('deletePack'))
    dispatch(modalActions.setPackName(name))
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
                  {el.cover && <img className={s.nameImg} src={el.cover} alt="img" />}
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
                  {el.cardsCount ? (
                    <Link to={`/learn-pack/${el.id}`}>
                      <Play className={s.icon} />
                    </Link>
                  ) : (
                    <Play className={s.icon} onClick={() => toast.error('No cart')} />
                  )}
                  {el.author.id === authData?.id && (
                    <>
                      <Edit
                        className={s.icon}
                        onClick={() => {
                          onEditHandler(el.name, el.id, el.isPrivate, el.cover)
                        }}
                      />
                      <Trash
                        className={s.icon}
                        onClick={() => {
                          onDeleteHandler(el.name, el.id)
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
