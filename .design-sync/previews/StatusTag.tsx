import { StatusTag } from '@rentar/ui'

function Row({ children }) {
  return <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
}

export const Propiedad = () => (
  <Row>
    <StatusTag domain="propiedad" status="borrador" />
    <StatusTag domain="propiedad" status="publicada" />
    <StatusTag domain="propiedad" status="pausada" />
    <StatusTag domain="propiedad" status="alquilada" />
  </Row>
)

export const Contrato = () => (
  <Row>
    <StatusTag domain="contrato" status="borrador" />
    <StatusTag domain="contrato" status="pendiente_firma" />
    <StatusTag domain="contrato" status="vigente" />
    <StatusTag domain="contrato" status="finalizado" />
    <StatusTag domain="contrato" status="rescindido" />
  </Row>
)

export const Firma = () => (
  <Row>
    <StatusTag domain="firma" status="pendiente" />
    <StatusTag domain="firma" status="firmado" />
    <StatusTag domain="firma" status="rechazado" />
  </Row>
)

export const Cobro = () => (
  <Row>
    <StatusTag domain="cobro" status="pendiente" />
    <StatusTag domain="cobro" status="pagado" />
    <StatusTag domain="cobro" status="vencido" />
    <StatusTag domain="cobro" status="anulado" />
  </Row>
)

export const Reclamo = () => (
  <Row>
    <StatusTag domain="reclamo" status="abierto" />
    <StatusTag domain="reclamo" status="en_proceso" />
    <StatusTag domain="reclamo" status="resuelto" />
    <StatusTag domain="reclamo" status="cerrado" />
  </Row>
)

export const Suscripcion = () => (
  <Row>
    <StatusTag domain="suscripcion" status="activa" />
    <StatusTag domain="suscripcion" status="vencida" />
    <StatusTag domain="suscripcion" status="cancelada" />
  </Row>
)
