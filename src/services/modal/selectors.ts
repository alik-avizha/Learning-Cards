import { createSelector } from 'reselect'

import { RootState } from '../store.ts'

const selectModalSlice = (state: RootState) => state.modalSlice

export const selectOpenModals = createSelector(
  [selectModalSlice],
  modalSlice => modalSlice.showModal
)

export const selectSettings = createSelector(
  [selectModalSlice],
  modalSlice => modalSlice.settingsValue
)
