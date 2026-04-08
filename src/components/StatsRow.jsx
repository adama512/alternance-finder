export default function StatsRow({ total, avgScore, saved }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Offres trouvées</div>
        <div className="stat-value">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Score moyen</div>
        <div className="stat-value">{avgScore}%</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Sauvegardées</div>
        <div className="stat-value">{saved}</div>
      </div>
    </div>
  )
}