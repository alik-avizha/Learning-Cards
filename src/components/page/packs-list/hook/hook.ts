import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/table/type.ts'

export const usePackDeckState = (sliderValues: { minValue: number; maxValue: number }) => {
  const [cardId, setCardId] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [valueSlider, setValueSlider] = useState<number[]>([
    sliderValues.minValue,
    sliderValues.maxValue,
  ])

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
    valueSlider,
    setValueSlider,
  }
}
