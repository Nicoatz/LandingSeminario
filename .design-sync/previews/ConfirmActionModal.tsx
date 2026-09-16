import { ConfirmActionModal } from '@rentar/ui'

export const Danger = () => (
  <ConfirmActionModal
    open
    title="¿Eliminar esta propiedad?"
    description="Esta acción no se puede deshacer."
    danger
    onConfirm={() => {}}
    onCancel={() => {}}
  />
)

export const Neutral = () => (
  <ConfirmActionModal
    open
    title="¿Pausar esta publicación?"
    description="Vas a poder reactivarla cuando quieras."
    confirmLabel="Pausar"
    onConfirm={() => {}}
    onCancel={() => {}}
  />
)
