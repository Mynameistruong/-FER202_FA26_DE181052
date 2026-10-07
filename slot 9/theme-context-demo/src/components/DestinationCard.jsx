import { useLanguage } from '../context/useLanguage.js'

export function DestinationCard({ destination, index }) {
  const { t } = useLanguage()

  return (
    <article className="destination-card">
      <img src={destination.image} alt={t(destination.altKey)} loading="lazy" />
      <span className="destination-card__number">0{index + 1}</span>
      <div className="destination-card__caption">
        <h3>{t(destination.nameKey)}</h3>
        <p>{t(destination.detailKey)}</p>
      </div>
      <span className="destination-card__arrow" aria-hidden="true">↗</span>
    </article>
  )
}