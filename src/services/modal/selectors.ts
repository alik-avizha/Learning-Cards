import { createSelector } from 'reselect'

import { RootState } from '../store.ts'

const selectModalSlice = (state: RootState) => state.modalSlice

export const selectOpen = createSelector([selectModalSlice], modalSlice => modalSlice.open)
export const selectPackSettings = createSelector([selectModalSlice], modalSlice => modalSlice.pack)
export const selectCardSettings = createSelector([selectModalSlice], modalSlice => modalSlice.card)
