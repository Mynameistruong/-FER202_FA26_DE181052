import { useLanguage } from '../context/useLanguage.js'

export function LanguageSwitcher() {
  const { lang, switchLang, t } = useLanguage()

  return (
    <button
      className="language-switcher"
      type="button"
      onClick={switchLang}
      aria-label={t('nav.language')}
      title={t('nav.language')}
    >
      <span className="language-switcher__globe" aria-hidden="true">◎</span>
      <span>{lang.toUpperCase()}</span>
      <span className="language-switcher__arrow" aria-hidden="true">↗</span>
    </button>
  )
}