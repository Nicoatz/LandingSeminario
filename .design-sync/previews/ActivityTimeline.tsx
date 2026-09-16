import { ActivityTimeline } from '@rentar/ui'

const events = [
  { id: '1', title: 'Contrato firmado por el garante', date: new Date(Date.now() - 1000 * 60 * 60 * 48), colorKey: 'success' },
  { id: '2', title: 'Recordatorio de pago enviado', date: new Date(Date.now() - 1000 * 60 * 60 * 24), colorKey: 'info' },
  { id: '3', title: 'Pago registrado', date: new Date(), colorKey: 'success' },
]

export const Default = () => <ActivityTimeline events={events} />
