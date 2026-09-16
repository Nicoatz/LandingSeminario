import type { ReactNode } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import styles from './EmptyState.module.css'

/** Props de {@link EmptyState}. */
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  /** Acción sugerida, ej. un `<Button>` para crear el primer recurso. */
  action?: ReactNode
  'data-testid'?: string
}

/**
 * Estado vacío genérico (sin propiedades, sin contratos, sin resultados de
 * búsqueda). Envuelve el mismo patrón visual en todo el panel en vez de que
 * cada pantalla arme el suyo a mano.
 */
export function EmptyState({ icon, title, description, action, ...rest }: EmptyStateProps) {
  return (
    <div className={styles.wrap} {...rest}>
      <span className={styles.icon}>{icon ?? <InboxOutlined />}</span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
