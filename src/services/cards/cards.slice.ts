import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isMyPack: false,
}

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setIsMyPack: (state, action: PayloadAction<{ isMyPack: boolean }>) => {
      state.isMyPack = action.payload.isMyPack
    },
  },
})
