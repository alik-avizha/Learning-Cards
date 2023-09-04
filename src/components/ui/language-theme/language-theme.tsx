import { useTranslation } from 'react-i18next'

import { SuperSelect } from '../select'

import { useAppSelector } from '@/services/store.ts'

const languageOptions = [
  { id: 1, value: 'en' },
  { id: 2, value: 'ru' },
]

export const LanguageTheme = () => {
  const { i18n } = useTranslation()
  const language = useAppSelector(state => state.languageSlice.value)

  const setLanguageApp = async (value: any) => {
    await i18n.changeLanguage(value)
  }

  return (
    <SuperSelect options={languageOptions} onValueChange={setLanguageApp} defaultValue={language} />
  )
}
