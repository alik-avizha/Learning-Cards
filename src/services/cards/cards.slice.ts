import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isMyPack: true,
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
