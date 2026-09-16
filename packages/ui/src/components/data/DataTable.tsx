'use client'

import type { ReactNode } from 'react'
import { Empty, Skeleton, Table, type TableColumnsType } from 'antd'
import styles from './DataTable.module.css'

export interface DataTableColumn<T> {
  key: string
  title: string
  render: (record: T) => ReactNode
}

/** Props de {@link DataTable}. */
interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey: (record: T) => string
  loading?: boolean
  emptyDescription?: string
  'data-testid'?: string
}

/**
 * Tabla que en mobile (<640px) se convierte en una lista de tarjetas
 * (una por fila, pares label/valor) en vez de forzar scroll horizontal —
 * se renderizan ambas vistas y el CSS decide cuál mostrar según el ancho,
 * para no depender de detectar el breakpoint en JS (evita el parpadeo de
 * hidratación de medir `window` en el cliente).
 */
export function DataTable<T>({ columns, data, rowKey, loading, emptyDescription, ...rest }: DataTableProps<T>) {
  if (loading) {
    return (
      <div {...rest}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div {...rest}>
        <Empty description={emptyDescription ?? 'Sin resultados'} />
      </div>
    )
  }

  const antdColumns: TableColumnsType<T> = columns.map((col) => ({
    key: col.key,
    title: col.title,
    render: (_value, record) => col.render(record),
  }))

  return (
    <div {...rest}>
      <div className={styles.tableView}>
        <Table<T> columns={antdColumns} dataSource={data} rowKey={rowKey} pagination={false} />
      </div>
      <ul className={styles.cardList}>
        {data.map((record) => (
          <li key={rowKey(record)} className={styles.cardItem}>
            {columns.map((col) => (
              <div key={col.key} className={styles.cardRow}>
                <span className={styles.cardLabel}>{col.title}</span>
                <span className={styles.cardValue}>{col.render(record)}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
