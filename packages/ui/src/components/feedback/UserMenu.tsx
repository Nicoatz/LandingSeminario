'use client'

import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import type { UserRole } from '@rentar/shared-types'
import styles from './UserMenu.module.css'

const ROLE_LABEL: Record<UserRole, string> = {
  locador: 'Locador',
  locatario: 'Locatario',
  garante: 'Garante',
  admin: 'Administrador',
}

/** Props de {@link UserMenu}. */
interface UserMenuProps {
  name: string
  role: UserRole
  avatarUrl?: string
  onLogout?: () => void
  'data-testid'?: string
}

/** Menú de usuario del `AppShell`: avatar, nombre, rol, y salir. */
export function UserMenu({ name, role, avatarUrl, onLogout, ...rest }: UserMenuProps) {
  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          {
            key: 'logout',
            label: 'Cerrar sesión',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: onLogout,
          },
        ],
      }}
    >
      <button type="button" className={styles.trigger} {...rest}>
        <Avatar src={avatarUrl} icon={!avatarUrl && <UserOutlined />} size="small" />
        <span className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{ROLE_LABEL[role]}</span>
        </span>
      </button>
    </Dropdown>
  )
}
