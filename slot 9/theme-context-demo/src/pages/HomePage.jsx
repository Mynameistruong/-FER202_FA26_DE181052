import { useState } from 'react'
import { DestinationCard } from '../components/DestinationCard.jsx'
import { useLanguage } from '../context/useLanguage.js'
import { destinations } from '../data/destinations.js'

export function HomePage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubscribe(event) {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      setMessage('newsletter.error')
      return
    }

    setMessage('newsletter.success')
    setEmail('')
  }

  return (
    <main id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span />{t('hero.eyebrow')}</p>
          <h1 id="hero-title">{t('hero.title')}</h1>
          <p className="hero-copy__description">{t('hero.description')}</p>
          <a className="text-link" href="#story">
            {t('hero.cta')} <span aria-hidden="true">↗</span>
          </a>
          <div className="hero-index" aria-hidden="true">
            <span>01</span><i /><span>04</span>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=90"
            alt={t('hero.imageAlt')}
            fetchPriority="high"
          />
          <span className="image-stamp">21°01' N<br />105°51' E</span>
          <span className="image-caption">{t('hero.imageCaption')}</span>
        </div>
        <span className="hero-side-note">{t('hero.readTime')}</span>
      </section>

      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="story-image-frame">
          <img
            src="https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1100&q=85"
            alt={t('story.imageAlt')}
            loading="lazy"
          />
          <span className="story-image-label">{t('story.imageLabel')}</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow"><span />{t('story.label')}</p>
          <h2 id="story-title">{t('story.title')}</h2>
          <p className="story-copy__description">{t('story.description')}</p>
          <a className="text-link" href="#places">
            {t('story.link')} <span aria-hidden="true">↗</span>
          </a>
          <span className="story-scribble" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="places-section" id="places" aria-labelledby="places-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span />{t('places.kicker')}</p>
            <h2 id="places-title">{t('places.title')}</h2>
          </div>
          <a className="text-link text-link--small" href="#newsletter">
            {t('places.viewAll')} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>
      </section>

      <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title">
        <div className="newsletter-copy">
          <p className="eyebrow"><span />{t('newsletter.kicker')}</p>
          <h2 id="newsletter-title">{t('newsletter.title')}</h2>
          <p>{t('newsletter.description')}</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <label className="visually-hidden" htmlFor="newsletter-email">{t('newsletter.placeholder')}</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit">{t('newsletter.submit')} <span aria-hidden="true">↗</span></button>
          <p className="form-message" aria-live="polite">{message ? t(message) : ''}</p>
        </form>
        <span className="newsletter-seal" aria-hidden="true">CV<br /><small>{t('newsletter.sealLabel')}</small></span>
      </section>
    </main>
  )
}