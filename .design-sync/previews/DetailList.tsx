import { DetailList, IndexBadge, MoneyAmount } from '@rentar/ui'

export const ContractSummary = () => (
  <DetailList
    title="Resumen del contrato"
    items={[
      { label: 'Propiedad', value: 'Depto Nueva Córdoba' },
      { label: 'Locatario', value: 'Juan Pérez' },
      { label: 'Índice de ajuste', value: <IndexBadge index="ICL" /> },
      { label: 'Monto actual', value: <MoneyAmount amount={580000} emphasis /> },
    ]}
  />
)
