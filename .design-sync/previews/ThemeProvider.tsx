import { Button, Card } from 'antd'
import { ThemeProvider, StatusTag, MoneyAmount } from '@rentar/ui'

function Sample() {
  return (
    <Card style={{ width: 280 }}>
      <p style={{ marginBottom: 12, fontWeight: 600 }}>Depto Nueva Córdoba</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <StatusTag domain="propiedad" status="publicada" />
        <MoneyAmount amount={580000} emphasis />
      </div>
      <Button type="primary">Publicar propiedad</Button>
    </Card>
  )
}

export const Light = () => (
  <ThemeProvider>
    <Sample />
  </ThemeProvider>
)

export const Dark = () => (
  <ThemeProvider dark>
    <div style={{ background: '#0B1420', padding: 24 }} data-rentar-theme="dark">
      <Sample />
    </div>
  </ThemeProvider>
)
