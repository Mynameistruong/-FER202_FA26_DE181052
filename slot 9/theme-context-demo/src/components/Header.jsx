import { useLanguage } from '../context/useLanguage.js'
import { LanguageSwitcher } from './LanguageSwitcher.jsx'

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={t('brand.name')}>
        <span className="brand__mark" aria-hidden="true">C.</span>
        <span className="brand__text">
          <strong>{t('brand.name')}</strong>
          <small>{t('brand.edition')}</small>
        </span>
      </a>

      <nav className="main-nav" aria-label={t('nav.label')}>
        <a href="#story">{t('nav.stories')}</a>
        <a href="#places">{t('nav.places')}</a>
        <a href="#about">{t('nav.about')}</a>
      </nav>

      <LanguageSwitcher />
    </header>
  )
}