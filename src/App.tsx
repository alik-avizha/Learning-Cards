import { useState } from 'react'

import { RadioGroupDemo, SelectDemo } from './components/ui'

export function App() {
  const people = [
    { id: 1, value: 'Durward Reynolds' },
    { id: 2, value: 'Kenton Towne' },
    { id: 3, value: 'Therese Wunsch' },
    { id: 4, value: 'Benedict Kessler' },
    { id: 5, value: 'Katelyn Rohan' },
  ]

  const [perso, setPersot] = useState(people[0])

  return (
    <div>
      <RadioGroupDemo options={people} />
      <SelectDemo options={people} value={perso} onChangeOption={setPersot} />
    </div>
  )
}
