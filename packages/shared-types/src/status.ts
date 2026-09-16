/** Estado de una propiedad publicada por su dueño. */
export type PropertyStatus = 'borrador' | 'publicada' | 'pausada' | 'alquilada'

/** Estado del contrato de alquiler entre locador, locatario y garante. */
export type ContractStatus =
  | 'borrador'
  | 'pendiente_firma'
  | 'vigente'
  | 'finalizado'
  | 'rescindido'

/** Estado de la firma electrónica de un firmante individual dentro de un contrato. */
export type SignatureStatus = 'pendiente' | 'firmado' | 'rechazado'

/** Estado de un cobro/pago periódico del alquiler. */
export type PaymentStatus = 'pendiente' | 'pagado' | 'vencido' | 'anulado'

/** Estado de un reclamo abierto por locador o locatario. */
export type ClaimStatus = 'abierto' | 'en_proceso' | 'resuelto' | 'cerrado'

/** Estado de la suscripción paga del locador a la plataforma. */
export type SubscriptionStatus = 'activa' | 'vencida' | 'cancelada'

/**
 * Rol de un usuario dentro de la plataforma. No es un "estado de ciclo de
 * vida" como los de arriba (no envejece ni progresa), así que no forma parte
 * de {@link StatusDomainMap} ni se muestra con `StatusTag` — se representa
 * con un tag neutro simple (ver `UserMenu`/`AppShell`).
 */
export type UserRole = 'locador' | 'locatario' | 'garante' | 'admin'

/** Dominios de negocio que tienen un estado de ciclo de vida mostrable con `StatusTag`. */
export type StatusDomain = 'propiedad' | 'contrato' | 'firma' | 'cobro' | 'reclamo' | 'suscripcion'

/**
 * Mapea cada {@link StatusDomain} a su tipo de estado correspondiente. La usa
 * `getStatusMeta`/`StatusTag` de `@rentar/ui` para tipar `status` en función
 * de `domain` (si `domain` es `'cobro'`, `status` solo acepta `PaymentStatus`).
 */
export interface StatusDomainMap {
  propiedad: PropertyStatus
  contrato: ContractStatus
  firma: SignatureStatus
  cobro: PaymentStatus
  reclamo: ClaimStatus
  suscripcion: SubscriptionStatus
}
