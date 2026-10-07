import { useLanguage } from '../context/useLanguage.js'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer" id="about">
      <a className="footer-brand" href="#top">{t('brand.name')}<span>.</span></a>
      <p>{t('footer.note')}</p>
      <small>{t('footer.rights')}</small>
    </footer>
  )
}