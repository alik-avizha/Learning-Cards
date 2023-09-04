import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  value: string
}

const initialState: initialStateType = {
  value: localStorage.getItem('i18nextLng') || 'en',
}

export const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {},
})
