import { useMemo, useState } from 'react'

import { Sort } from '../../../ui/table/type.ts'
import { ModalType } from '../pack-modal'

export const usePackDeckState = (
  initialPackName = '',
  sliderValues: {
    minValue: number
    maxValue: number
  },
  currentPage: number,
  itemsPerPage: number
) => {
  const [packName, setPackName] = useState<string>(initialPackName)
  const [open, setOpen] = useState<ModalType>({
    addNewPack: false,
    editPack: false,
    deletePack: false,
  })
  const [cardId, setCardId] = useState<string>('')
  const [privatePack, setPrivatePack] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [valueSlider, setValueSlider] = useState<number[]>([
    sliderValues.minValue,
    sliderValues.maxValue,
  ])
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [page, setPage] = useState(currentPage)

  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  return {
    packName,
    setPackName,
    open,
    setOpen,
    cardId,
    setCardId,
    privatePack,
    setPrivatePack,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    onSetPerPageHandler,
    valueSlider,
    setValueSlider,
    page,
    setPage,
    perPage,
  }
}
