export default function SearchBar({ value, onChange, onSearch, loading }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch()}
        placeholder="Ex: développeur, data analyst, cybersécurité..."
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? 'Recherche...' : 'Rechercher'}
      </button>
    </div>
  )
}