import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from './base-api.ts'
import { cardsSlice } from './cards'
import { deckSlice } from './decks/deck.slice.ts'
import { modalSlice } from './modal'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [deckSlice.name]: deckSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
