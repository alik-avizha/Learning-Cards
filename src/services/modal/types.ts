export type ModalType = {
  open: NameModal
  pack: {
    privatePack: boolean
    packName: string
    img: File | null
    editImg: string | null | undefined
  }
  card: {
    question: string
    answer: string
    questionImg: File | null
    answerImg: File | null
    questionEditImg: string | null | undefined
    answerEditImg: string | null | undefined
  }
}

export type NameModal =
  | 'addPack'
  | 'addCard'
  | 'editPack'
  | 'editCard'
  | 'deletePack'
  | 'deleteCard'
  | ''
