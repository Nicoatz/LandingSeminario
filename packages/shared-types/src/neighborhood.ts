/** Nivel de demanda relativo del barrio; dato editorial, no afecta el filtrado. */
export type NeighborhoodTier = 'alta demanda' | 'alternativo'

/** Barrio de Córdoba Capital donde opera el piloto de RentAR. */
export interface Neighborhood {
  slug: string
  name: string
  tier: NeighborhoodTier
}
