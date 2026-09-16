/** Tipología de la propiedad. */
export type PropertyType = 'departamento' | 'casa' | 'ph'

/**
 * Índice legal de ajuste periódico del alquiler en Argentina: IPC (INDEC) o
 * ICL (BCRA) — los dos únicos índices habilitados para contratos de alquiler.
 */
export type AdjustmentIndex = 'IPC' | 'ICL'

/** Clave de una característica opcional de la propiedad. */
export type CharacteristicKey =
  | 'amoblado'
  | 'mascotas'
  | 'cochera'
  | 'balcon'
  | 'apto-profesional'

/** Opción de característica tal como se muestra en filtros y tarjetas. */
export interface CharacteristicOption {
  key: CharacteristicKey
  label: string
}

/**
 * Propiedad en alquiler publicada por su dueño (mock de la etapa estática).
 *
 * No incluye el campo `image`: ese tipo (`StaticImageData` de `next/image`)
 * es específico de Next.js y se agrega en `apps/web` mediante composición,
 * para que este paquete no dependa del framework y sea reutilizable desde
 * `apps/api`.
 */
export interface Property {
  id: string
  title: string
  neighborhoodSlug: string
  neighborhoodName: string
  type: PropertyType
  priceMonthly: number
  bedrooms: number
  areaM2: number
  adjustmentIndex: AdjustmentIndex
  characteristics: CharacteristicKey[]
  /** Si es `true`, la publicación es directa del dueño, sin inmobiliaria — hoy siempre `true`. */
  directOwner: boolean
}
