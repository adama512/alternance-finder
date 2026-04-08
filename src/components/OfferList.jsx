import OfferCard from './OfferCard'

export default function OfferList({ offres, loading, savedIds, onToggleSave }) {
  if (loading) return <div className="empty-state">Recherche en cours...</div>
  if (!offres.length) return (
    <div className="empty-state">
      <p>Lance une recherche pour voir les offres</p>
    </div>
  )

  return (
    <div className="offers-list">
      <div className="results-header">
        <span className="results-count">{offres.length} offre{offres.length > 1 ? 's' : ''} trouvée{offres.length > 1 ? 's' : ''}</span>
      </div>
      {offres.map(offre => (
        <OfferCard
          key={offre.id}
          offre={offre}
          saved={savedIds.has(offre.id)}
          onToggleSave={() => onToggleSave(offre.id)}
        />
      ))}
    </div>
  )
}