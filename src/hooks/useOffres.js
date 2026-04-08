import { useState, useCallback } from 'react'
import { searchOffres } from '../api/offres'
import { calcScore } from '../utils/scoring'

export function useOffres() {
  const [offres, setOffres] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [savedIds, setSavedIds] = useState(new Set())

  const search = useCallback(async (query, filters) => {
    setLoading(true)
    setError(null)
    try {
      const resultats = await searchOffres(query, filters)

      const notees = resultats
        .map(offre => ({
          id: offre.id,
          intitule: offre.intitule,
          entreprise: offre.entreprise?.nom || 'Entreprise non précisée',
          lieu: offre.lieuTravail?.libelle || '',
          duree: offre.dureeTravailLibelle || '',
          niveau: offre.formations?.[0]?.niveauRequis?.libelle || '',
          teletravail: offre.description?.toLowerCase().includes('télétravail') ? 'Télétravail' : '',
          salaire: offre.salaire?.commentaire || '',
          description: offre.description || '',
          url: offre.origineOffre?.urlOrigine || '#',
          _score: calcScore(offre, filters),
        }))
        .sort((a, b) => b._score - a._score)

      setOffres(notees)
    } catch (err) {
      setError('Erreur lors de la recherche : ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleSave = useCallback((id) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return {
    offres, loading, error, search,
    savedIds,
    savedCount: savedIds.size,
    toggleSave,
  }
}