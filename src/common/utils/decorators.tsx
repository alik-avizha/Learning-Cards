import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { baseApi } from '../../services/base-api.ts'
import { cardsSlice } from '../../services/cards'
import { deckSlice } from '../../services/decks/deck.slice.ts'
import { modalSlice } from '../../services/modal'

export const storyBookStore = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [deckSlice.name]: deckSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <BrowserRouter>{storyFn()}</BrowserRouter>
}

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
