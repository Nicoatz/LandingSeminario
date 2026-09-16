import { NotificationBell } from '@rentar/ui'

const notifications = [
  { id: '1', title: 'Nuevo mensaje de un locatario interesado', date: new Date(Date.now() - 1000 * 60 * 30), read: false },
  { id: '2', title: 'Cobro vencido: Depto Nueva Córdoba', date: new Date(Date.now() - 1000 * 60 * 60 * 5), read: true },
]

export const WithUnread = () => <NotificationBell notifications={notifications} />

export const Empty = () => <NotificationBell notifications={[]} />
