import { BankOutlined } from '@ant-design/icons'
import { MoneyAmount, StatCard } from '@rentar/ui'

export const Group = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <StatCard title="Propiedades activas" value="4" icon={<BankOutlined />} delta={{ label: '+1 este mes', trend: 'up' }} />
    <StatCard title="Cobros pendientes" value={<MoneyAmount amount={580000} />} delta={{ label: 'vence en 3 días', trend: 'neutral' }} />
    <StatCard title="Reclamos abiertos" value="1" delta={{ label: '-2 vs. mes anterior', trend: 'down' }} />
  </div>
)
