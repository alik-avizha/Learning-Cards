import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  id: '',
}

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setCurrentPackId: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id
    },
  },
})
