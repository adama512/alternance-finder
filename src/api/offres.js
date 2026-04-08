import { getToken } from './auth'

export async function searchOffres(query, filters) {
  const token = await getToken()

  // France Travail API v2 : pas de typeContrat pour l'alternance,
  // on cherche via motsCles avec "alternance" et on filtre le secteur NAF
  const params = new URLSearchParams({
    motsCles: query + ' alternance',
    range: '0-49',
    sort: '1', // tri par date
  })

  const response = await fetch(
    `/api-ft/partenaire/offresdemploi/v2/offres/search?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Erreur API : ${response.status} — ${errText}`)
  }

  const data = await response.json()
  return data.resultats || []
}