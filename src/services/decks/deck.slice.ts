import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NameTypePack } from '@/services/decks/types.ts'

const initialState = {
  searchByName: '',
  tabSwitcherOptions: [
    { id: 1, value: 'My Cards' },
    { id: 2, value: 'All Cards' },
  ],
  slider: {
    minValue: 0,
    maxValue: 10,
  },
  paginationOptions: [
    { id: 1, value: 7 },
    { id: 2, value: 10 },
    { id: 3, value: 20 },
    { id: 4, value: 50 },
    { id: 5, value: 100 },
  ],
  currentPerPage: {
    packList: { id: 1, value: 7 },
    friendsPack: { id: 2, value: 7 },
    myPack: { id: 3, value: 7 },
  },
  currentPage: {
    packList: 1,
    friendsPack: 1,
    myPack: 1,
  },
}

export const deckSlice = createSlice({
  name: 'deckSlice',
  initialState,
  reducers: {
    setItemsPerPage: (
      state,
      action: PayloadAction<{ value: NameTypePack; newCurrentPage: number }>
    ) => {
      state.currentPerPage[action.payload.value].value = action.payload.newCurrentPage
    },
    setCurrentPage: (
      state,
      action: PayloadAction<{ value: NameTypePack; newCurrentPage: number }>
    ) => {
      state.currentPage[action.payload.value] = action.payload.newCurrentPage
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})
