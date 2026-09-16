import type { CharacteristicKey, PropertyType } from './property'

/** Cantidad de dormitorios filtrable; `3` se interpreta como "3 o más". */
export type BedroomsFilter = number | 'todos'

/** Estado de los filtros de búsqueda de la landing (barrio, precio, tipología, dormitorios, características). */
export interface FilterState {
  neighborhoodSlug: string
  minPrice: number
  maxPrice: number
  type: PropertyType | 'todos'
  bedrooms: BedroomsFilter
  characteristics: CharacteristicKey[]
}
