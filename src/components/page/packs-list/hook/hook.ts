import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/table/type.ts'

export const usePackDeckState = (
  sliderValues: {
    minValue: number
    maxValue: number
  },
  currentPage: number,
  itemsPerPage: number
) => {
  const [cardId, setCardId] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
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
    cardId,
    setCardId,
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
