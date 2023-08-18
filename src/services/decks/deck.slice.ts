import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPagePackList: 1,
  currentPageFriendsPack: 1,
  currentPageMyPack: 1,
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
  currentPerPagePackList: { id: 1, value: 7 },
  currentPerPageFriendPack: { id: 2, value: 7 },
  currentPerPageMyPack: { id: 3, value: 7 },
}

export const deckSlice = createSlice({
  name: 'deckSlice',
  initialState,
  reducers: {
    setItemsPackListPerPage: (state, action: PayloadAction<number>) => {
      state.currentPerPagePackList.value = action.payload
    },
    setItemsFriendsPackPerPage: (state, action: PayloadAction<number>) => {
      state.currentPerPageFriendPack.value = action.payload
    },
    setItemsMyPackPerPage: (state, action: PayloadAction<number>) => {
      state.currentPerPageMyPack.value = action.payload
    },

    setCurrentPagePackList: (state, action: PayloadAction<number>) => {
      state.currentPagePackList = action.payload
    },
    setCurrentPageFriendsPack: (state, action: PayloadAction<number>) => {
      state.currentPageFriendsPack = action.payload
    },
    setCurrentPageMyPack: (state, action: PayloadAction<number>) => {
      state.currentPageMyPack = action.payload
    },

    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})
