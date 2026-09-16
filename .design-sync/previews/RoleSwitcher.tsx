import { useState } from 'react'
import { RoleSwitcher } from '@rentar/ui'

export const Default = () => {
  const [role, setRole] = useState('locador')
  return <RoleSwitcher role={role} onChange={setRole} />
}
