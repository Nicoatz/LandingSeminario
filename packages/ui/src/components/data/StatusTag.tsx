'use client'

import { Tag } from 'antd'
import type { StatusDomain, StatusDomainMap } from '@rentar/shared-types'
import type { SemanticColorKey } from '../../tokens/semantic'
import { getStatusMeta } from '../../utils/getStatusMeta'

/**
 * Mapea cada color semántico al preset de color de `Tag` de antd. Usar los
 * presets (en vez de un hex propio) hace que el tag lea automáticamente el
 * token activo del `ConfigProvider` (`colorSuccess`, `colorWarning`, etc.),
 * así que se ve correcto tanto en el tema claro como en el oscuro sin que
 * este componente tenga que saber cuál está activo.
 */
const TAG_COLOR_BY_KEY: Record<SemanticColorKey, string> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'processing',
  neutral: 'default',
  money: 'gold',
}

/** Props de {@link StatusTag}. */
interface StatusTagProps<D extends StatusDomain> {
  /** Dominio del estado (`'propiedad'`, `'contrato'`, etc.). */
  domain: D
  /** Estado dentro de ese dominio — tipado en función de `domain`. */
  status: StatusDomainMap[D]
  'data-testid'?: string
}

/**
 * Tag de estado de dominio (propiedad, contrato, firma, cobro, reclamo,
 * suscripción): resuelve label + color + ícono desde `getStatusMeta`, así
 * que ningún componente de la app tiene que decidir a mano qué color le
 * corresponde a un estado.
 *
 * @example
 * <StatusTag domain="contrato" status="pendiente_firma" />
 */
export function StatusTag<D extends StatusDomain>({ domain, status, ...rest }: StatusTagProps<D>) {
  const meta = getStatusMeta(domain, status)
  const Icon = meta.icon

  return (
    <Tag color={TAG_COLOR_BY_KEY[meta.colorKey]} icon={<Icon />} {...rest}>
      {meta.label}
    </Tag>
  )
}
