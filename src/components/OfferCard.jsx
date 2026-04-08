import { useState } from 'react'

export default function OfferCard({ offre, saved, onToggleSave }) {
  const [expanded, setExpanded] = useState(false)

  const scoreStyle = offre._score >= 75
    ? { bg: '#EAF3DE', color: '#27500A' }
    : offre._score >= 50
    ? { bg: '#FAEEDA', color: '#633806' }
    : { bg: '#FCEBEB', color: '#791F1F' }

  return (
    <div className={`offer-card ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="offer-top">
        <div className="company-logo">
          {offre.entreprise?.slice(0, 2).toUpperCase()}
        </div>
        <div className="offer-info">
          <div className="offer-title">{offre.intitule}</div>
          <div className="offer-company">{offre.entreprise} — {offre.lieu}</div>
          <div className="offer-tags">
            {offre.duree && <span className="tag">{offre.duree} mois</span>}
            {offre.niveau && <span className="tag">{offre.niveau}</span>}
            {offre.teletravail && <span className="tag green">{offre.teletravail}</span>}
            {offre.salaire && <span className="tag green">{offre.salaire} €/mois</span>}
          </div>
        </div>
        <div className="offer-score" style={{ background: scoreStyle.bg, color: scoreStyle.color }}>
          {offre._score}%
        </div>
      </div>

      {expanded && (
        <div className="offer-details" onClick={e => e.stopPropagation()}>
          <p className="offer-desc">{offre.description || 'Pas de description disponible.'}</p>
          <div className="offer-actions">
            {offre.url && (
              <a href={offre.url} target="_blank" rel="noreferrer" className="btn-primary">
                Voir l'offre
              </a>
            )}
            <button className="btn-secondary" onClick={onToggleSave}>
              {saved ? 'Retirer' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}