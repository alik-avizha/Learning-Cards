import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModalType, NameModal } from '@/services/modal/types.ts'

const initialState: ModalType = {
  open: '',
  pack: {
    packName: '',
    privatePack: false,
    img: null,
    editImg: '',
  },
  card: {
    question: '',
    answer: '',
    questionImg: null,
    answerImg: null,
    questionEditImg: '',
    answerEditImg: '',
  },
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<NameModal>) => {
      state.open = action.payload
    },
    setCloseModal: (state, _) => {
      state.open = ''
    },
    setClearState: (state, _) => {
      state.pack.packName = ''
      state.pack.img = null
      state.pack.privatePack = false
      state.card.question = ''
      state.card.answer = ''
      state.card.questionImg = null
      state.card.answerImg = null
    },
    setPrivatePack: (state, action: PayloadAction<boolean>) => {
      state.pack.privatePack = action.payload
    },
    setPackName: (state, action: PayloadAction<string>) => {
      state.pack.packName = action.payload
    },
    setImg: (state, action: PayloadAction<File>) => {
      state.pack.img = action.payload
    },
    setEditImg: (state, action: PayloadAction<string | null | undefined>) => {
      state.pack.editImg = action.payload
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.card.question = action.payload
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.card.answer = action.payload
    },
    setQuestionImg: (state, action: PayloadAction<File>) => {
      state.card.questionImg = action.payload
    },
    setAnswerImg: (state, action: PayloadAction<File>) => {
      state.card.answerImg = action.payload
    },
    setQuestionEditImg: (state, action: PayloadAction<string | null | undefined>) => {
      state.card.questionEditImg = action.payload
    },
    setAnswerEditImg: (state, action: PayloadAction<string | null | undefined>) => {
      state.card.answerEditImg = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
