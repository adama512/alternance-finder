
export async function searchOffres(query) {
  if (import.meta.env.PROD) {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error(`Erreur : ${response.status}`)
    return await response.json()
  }

  const { getToken } = await import('./auth')
  const token = await getToken()
  const response = await fetch(
    `/api-ft/partenaire/offresdemploi/v2/offres/search?motsCles=${encodeURIComponent(query + ' alternance')}&range=0-49&sort=1`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
  )
  if (!response.ok) throw new Error(`Erreur API : ${response.status}`)
  const data = await response.json()
  return data.resultats || []
}