export default function FilterPanel({ filters, onChange }) {
  const set = (key, val) => onChange({ ...filters, [key]: val })

  return (
    <div className="filter-panel">
      <div className="filter-title">Mes filtres profil</div>
      <div className="filters-grid">
        <div className="filter-group">
          <label>Localisation</label>
          <input type="text" value={filters.ville} onChange={e => set('ville', e.target.value)} placeholder="Ex: Paris, Lyon..." />
        </div>
        <div className="filter-group">
          <label>Durée du contrat</label>
          <select value={filters.duree} onChange={e => set('duree', e.target.value)}>
            <option value="">Toutes durées</option>
            <option value="12">12 mois</option>
            <option value="24">24 mois</option>
            <option value="36">36 mois</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Niveau d'études requis</label>
          <select value={filters.niveau} onChange={e => set('niveau', e.target.value)}>
            <option value="">Tous niveaux</option>
            <option value="Bac+2">Bac+2</option>
            <option value="Bac+3">Bac+3</option>
            <option value="Bac+5">Bac+5</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Secteur</label>
          <select value={filters.secteur} onChange={e => set('secteur', e.target.value)}>
            <option value="">Tous secteurs</option>
            <option value="tech">Tech / Startup</option>
            <option value="finance">Finance / Banque</option>
            <option value="conseil">Conseil / ESN</option>
            <option value="industrie">Industrie</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Rémunération min (€/mois)</label>
          <select value={filters.remunMin} onChange={e => set('remunMin', Number(e.target.value))}>
            <option value={0}>Sans minimum</option>
            <option value={800}>800 €</option>
            <option value={1000}>1 000 €</option>
            <option value={1200}>1 200 €</option>
            <option value={1500}>1 500 €</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Télétravail</label>
          <select value={filters.teletravail} onChange={e => set('teletravail', e.target.value)}>
            <option value="">Peu importe</option>
            <option value="partiel">Partiel accepté</option>
            <option value="complet">Full remote</option>
            <option value="non">Présentiel uniquement</option>
          </select>
        </div>
      </div>
    </div>
  )
}