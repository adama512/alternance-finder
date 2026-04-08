export function calcScore(offre, filtres) {
  let score = 50

  const lieu = offre.lieuTravail?.libelle?.toLowerCase() || ''
  if (filtres.ville && lieu.includes(filtres.ville.toLowerCase())) score += 15

  const niveau = offre.formations?.[0]?.niveauRequis?.libelle || ''
  if (filtres.niveau && niveau.includes(filtres.niveau)) score += 10

  const desc = offre.description?.toLowerCase() || ''
  if (desc.includes('télétravail')) score += 10

  const techKeywords = ['react', 'python', 'data', 'cloud', 'devops', 'node', 'java', 'angular']
  const techCount = techKeywords.filter(k => desc.includes(k)).length
  score += techCount * 3

  return Math.min(100, score)
}