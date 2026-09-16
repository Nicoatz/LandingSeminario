import { Button } from 'antd'
import { PageHeader } from '@rentar/ui'

export const Simple = () => <PageHeader title="Propiedades" subtitle="Gestioná tus publicaciones activas" />

export const WithBreadcrumbAndActions = () => (
  <PageHeader
    title="Depto Nueva Córdoba"
    subtitle="Publicada el 12 de marzo de 2026"
    breadcrumb={[{ label: 'Propiedades', href: '#' }, { label: 'Depto Nueva Córdoba' }]}
    actions={<Button type="primary">Editar publicación</Button>}
  />
)
