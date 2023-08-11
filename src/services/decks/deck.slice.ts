import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 7,
  currentPage: 1,
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
}

export const deckSlice = createSlice({
  name: 'deckSlice',
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})
