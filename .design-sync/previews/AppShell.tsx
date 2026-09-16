import { BankOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons'
import { AppShell, MoneyAmount, StatCard } from '@rentar/ui'

const navItems = [
  { key: 'propiedades', label: 'Propiedades', href: '#', icon: <HomeOutlined /> },
  { key: 'contratos', label: 'Contratos', href: '#', icon: <FileTextOutlined /> },
  { key: 'cobros', label: 'Cobros', href: '#', icon: <BankOutlined /> },
]

const notifications = [
  { id: '1', title: 'Nuevo mensaje de un locatario interesado', date: new Date(), read: false },
  { id: '2', title: 'Cobro vencido: Depto Nueva Córdoba', date: new Date(), read: true },
]

export const Locador = () => (
  <AppShell
    compact
    navItems={navItems}
    activeKey="propiedades"
    user={{ name: 'Nico A', role: 'locador' }}
    notifications={notifications}
  >
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <StatCard title="Propiedades activas" value="4" icon={<BankOutlined />} delta={{ label: '+1 este mes', trend: 'up' }} />
      <StatCard title="Cobros pendientes" value={<MoneyAmount amount={580000} />} delta={{ label: 'vence en 3 días', trend: 'neutral' }} />
    </div>
  </AppShell>
)
