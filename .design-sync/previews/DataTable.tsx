import { DataTable, MoneyAmount, StatusTag } from '@rentar/ui'

const properties = [
  { id: '1', title: 'Depto Nueva Córdoba', neighborhoodName: 'Nueva Córdoba', priceMonthly: 580000, status: 'publicada' },
  { id: '2', title: 'Casa Cerro de las Rosas', neighborhoodName: 'Cerro de las Rosas', priceMonthly: 950000, status: 'alquilada' },
  { id: '3', title: 'PH Güemes', neighborhoodName: 'Güemes', priceMonthly: 420000, status: 'pausada' },
  { id: '4', title: 'Monoambiente Centro', neighborhoodName: 'Centro', priceMonthly: 310000, status: 'borrador' },
]

const columns = [
  { key: 'title', title: 'Propiedad', render: (p) => p.title },
  { key: 'neighborhood', title: 'Barrio', render: (p) => p.neighborhoodName },
  { key: 'price', title: 'Precio', render: (p) => <MoneyAmount amount={p.priceMonthly} size="sm" /> },
  { key: 'status', title: 'Estado', render: (p) => <StatusTag domain="propiedad" status={p.status} /> },
]

export const WithData = () => <DataTable columns={columns} data={properties} rowKey={(p) => p.id} />

export const Empty = () => (
  <DataTable columns={columns} data={[]} rowKey={(p) => p.id} emptyDescription="Todavía no hay propiedades cargadas." />
)
