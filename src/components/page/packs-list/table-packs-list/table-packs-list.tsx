import { FC } from 'react'

import { Link } from 'react-router-dom'

import { ArrowDown, ArrowUp, Edit, Play, Trash } from '../../../../assets'
import { ResponseUserType } from '../../../../services/auth'
import { DecksResponse } from '../../../../services/decks/types.ts'
import { Button, TableElement } from '../../../ui'
import { ModalType } from '../pack-modal'

import s from './table-packs-list.module.scss'

type PropsType = {
  data: DecksResponse | undefined
  sortTable: boolean
  changeSort: (sort: boolean) => void
  authData: ResponseUserType | undefined
  setIsMyPackHandler: (isMyPack: boolean) => void
  handleOpen: (typeModal: string) => void
  setPackName: (name: string) => void
  setCardId: (cardId: string) => void
  setOpen: (modalType: ModalType) => void
  open: ModalType
}
export const TablePacksList: FC<PropsType> = ({
  data,
  sortTable,
  changeSort,
  authData,
  setIsMyPackHandler,
  handleOpen,
  setPackName,
  setCardId,
  setOpen,
  open,
}) => {
  const onSortHandler = () => {
    changeSort(!sortTable)
  }

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
      <TableElement.Head>
        <TableElement.Row>
          <TableElement.HeadCell>Name</TableElement.HeadCell>
          <TableElement.HeadCell>Cards</TableElement.HeadCell>
          <TableElement.HeadCell onClick={onSortHandler}>
            Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
          </TableElement.HeadCell>
          <TableElement.HeadCell>Created by</TableElement.HeadCell>
          <TableElement.HeadCell></TableElement.HeadCell>
        </TableElement.Row>
      </TableElement.Head>
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
                {new Date(el.created).toLocaleDateString('ru-RU')}
              </TableElement.Cell>
              <TableElement.Cell>{el.author.name}</TableElement.Cell>
              <TableElement.Cell>
                <div className={s.icons}>
                  <Play className={s.icon} />
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
