import { FC, useState } from 'react'

import { Listbox } from '@headlessui/react'

import { SelectArrow } from '../../../assets/icons'
import { Typography } from '../typography'

import s from './select.module.scss'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

type PropsType = {
  className?: string
  disabled?: boolean
  isDisabled: boolean
}

export const SelectDemo: FC<PropsType> = ({ isDisabled }) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox disabled={isDisabled} value={selectedPerson} onChange={setSelectedPerson}>
      <div className={s.listBox}>
        <Listbox.Button className={isDisabled ? s.disabledTrigger : s.trigger}>
          <Typography variant={'body1'}>{selectedPerson.name}</Typography>
          <SelectArrow className={isDisabled ? s.disabledArrow : s.arrow} />
        </Listbox.Button>

        <Listbox.Options className={s.optionList}>
          {people.map(person => (
            <Listbox.Option
              className={s.list}
              key={person.id}
              value={person}
              disabled={person.unavailable}
            >
              {({ disabled }) => (
                <Typography className={`${disabled ? s.listItemDisabled : s.listItem}`}>
                  {person.name}
                </Typography>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
