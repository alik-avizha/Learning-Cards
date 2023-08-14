import { FC } from 'react'

import { TableElement } from '@/components/ui'
import { Grade } from '@/components/ui/grade'
import { HeaderTable } from '@/components/ui/table/header-table.tsx'
import { Sort } from '@/components/ui/table/type.ts'
import { CardsResponse } from '@/services/cards'

type PropsType = {
  dataCards: CardsResponse | undefined
  sort: Sort
  setSort: (value: Sort) => void
}
export type Column = {
  key: string
  title: string
  sortable?: boolean
}

const columns: Array<Column> = [
  {
    key: 'question',
    title: 'Question',
    sortable: true,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
]

export const FriendsTable: FC<PropsType> = ({ sort, setSort, dataCards }) => {
  return (
    <TableElement.Root>
      <HeaderTable columns={columns} sort={sort} onSort={setSort} />
      <TableElement.Body>
        {dataCards?.items.map(el => {
          return (
            <TableElement.Row key={el.id}>
              <TableElement.Cell>{el.question}</TableElement.Cell>
              <TableElement.Cell>{el.answer}</TableElement.Cell>
              <TableElement.Cell>
                {new Date(el.updated).toLocaleDateString('ru-RU')}
              </TableElement.Cell>
              <TableElement.Cell>
                <Grade rating={el.grade} />
              </TableElement.Cell>
            </TableElement.Row>
          )
        })}
      </TableElement.Body>
    </TableElement.Root>
  )
}
