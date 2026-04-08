export default async function handler(req, res) {
  const { q } = req.query

  const tokenRes = await fetch(
    'https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.VITE_FT_CLIENT_ID,
        client_secret: process.env.VITE_FT_CLIENT_SECRET,
        scope: 'api_offresdemploiv2 o2dsoffre',
      }),
    }
  )
  const { access_token } = await tokenRes.json()

  const offresRes = await fetch(
    `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?motsCles=${encodeURIComponent(q + ' alternance')}&range=0-49&sort=1`,
    { headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' } }
  )
  const data = await offresRes.json()

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(data.resultats || [])
}