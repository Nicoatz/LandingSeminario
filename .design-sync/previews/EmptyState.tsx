import { Button } from 'antd'
import { EmptyState } from '@rentar/ui'

export const Default = () => (
  <EmptyState
    title="Todavía no publicaste ninguna propiedad"
    description="Cuando publiques tu primera propiedad, va a aparecer acá."
    action={
      <Button type="primary" size="small">
        Publicar propiedad
      </Button>
    }
  />
)
