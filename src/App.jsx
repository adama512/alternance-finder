import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import StatsRow from './components/StatsRow'
import OfferList from './components/OfferList'
import { useOffres } from './hooks/useOffres'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('alternance informatique')
  const [filters, setFilters] = useState({
    ville: 'Île-de-France',
    duree: '24',
    niveau: 'Bac+3',
    secteur: '',
    remunMin: 1000,
    teletravail: 'partiel',
  })

  const { offres, loading, error, search, savedCount, toggleSave, savedIds } = useOffres()

  return (
    <div className="app-wrapper">
      <div className="app">
        <div className="header">
          <h1>Alternance Finder <span className="badge">Informatique / Data</span></h1>
          <p className="subtitle">Recherche et filtrage intelligent des offres adaptées à ton profil</p>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => search(query, filters)}
          loading={loading}
        />

        <FilterPanel filters={filters} onChange={setFilters} />

        {error && <div className="error-msg">{error}</div>}

        {offres.length > 0 && (
          <StatsRow
            total={offres.length}
            avgScore={Math.round(offres.reduce((a, o) => a + o._score, 0) / offres.length)}
            saved={savedCount}
          />
        )}

        <OfferList
          offres={offres}
          loading={loading}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />
      </div>
    </div>
  )
}