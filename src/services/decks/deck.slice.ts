import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 10,
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
