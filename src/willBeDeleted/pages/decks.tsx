import { useState } from 'react'

import { Button, TableElement, TextField } from '../../components/ui'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/decks'
import { deckSlice } from '../../services/decks/deck.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.deckSlice.currentPAge)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const dispatch = useAppDispatch()

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(deckSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (itemsPerPage: number) =>
    dispatch(deckSlice.actions.setCurrentPage(itemsPerPage))
  const setSearchByName = (event: string) => dispatch(deckSlice.actions.setSearchByName(event))

  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const handleCreateClicked = () => {
    createDeck({ name: cardName })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Button onClick={() => setItemsPerPage(10)}>ItemsPage: 10</Button>
      <Button onClick={() => setItemsPerPage(20)}>ItemsPage: 20</Button>
      <Button onClick={() => setItemsPerPage(30)}>ItemsPage: 30</Button>
      <Button onClick={() => setCurrentPage(30)}>Current Page: 1</Button>
      <Button onClick={() => setCurrentPage(30)}>Current Page: 2</Button>
      <Button onClick={() => setCurrentPage(30)}>Current Page: 3</Button>
      <TextField type={'default'} onChangeText={event => setSearchByName(event)} />
      <TextField
        value={cardName}
        placeholder={'Crate name'}
        type={'default'}
        onChangeText={event => setCardName(event)}
      />
      <Button onClick={handleCreateClicked}>Create deck</Button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <TableElement.Root>
        <TableElement.Head>
          <TableElement.HeadCell>Name</TableElement.HeadCell>
          <TableElement.HeadCell>Cards</TableElement.HeadCell>
          <TableElement.HeadCell>Last Updated</TableElement.HeadCell>
          <TableElement.HeadCell>Create By</TableElement.HeadCell>
        </TableElement.Head>
        <TableElement.Body>
          {data?.items.map(el => {
            return (
              <TableElement.Row key={el.userId}>
                <TableElement.Cell>{el.name}</TableElement.Cell>
                <TableElement.Cell>{el.cardsCount}</TableElement.Cell>
                <TableElement.Cell>
                  {new Date(el.updated).toLocaleString('en-GB')}
                </TableElement.Cell>
                <TableElement.Cell>{el.author.name}</TableElement.Cell>
              </TableElement.Row>
            )
          })}
        </TableElement.Body>
      </TableElement.Root>
    </div>
  )
}
