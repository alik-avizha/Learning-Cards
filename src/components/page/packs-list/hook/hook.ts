import { useState } from 'react'

import { ModalType } from '../pack-modal'

export const usePackDeckState = (initialPackName = '', initialSortTable = false) => {
  const [packName, setPackName] = useState<string>(initialPackName)
  const [sortTable, setSortTable] = useState<boolean>(initialSortTable)
  const [open, setOpen] = useState<ModalType>({
    addNewPack: false,
    editPack: false,
    deletePack: false,
  })
  const [cardId, setCardId] = useState<string>('')
  const [privatePack, setPrivatePack] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

  return {
    packName,
    setPackName,
    sortTable,
    setSortTable,
    open,
    setOpen,
    cardId,
    setCardId,
    privatePack,
    setPrivatePack,
    userId,
    setUserId,
  }
}
