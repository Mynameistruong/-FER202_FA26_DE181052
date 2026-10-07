import { useCallback, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations.js'
import { LanguageContext } from './LanguageContext.js'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi')

  const switchLang = useCallback(() => {
    setLang((currentLang) => (currentLang === 'vi' ? 'en' : 'vi'))
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      switchLang,
      t: (key) => translations[lang]?.[key] ?? key,
    }),
    [lang, switchLang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}