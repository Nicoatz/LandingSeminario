'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Drawer, Layout, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import type { UserRole } from '@rentar/shared-types'
import logo from '../../assets/logo-rentar.svg'
import { NotificationBell, type NotificationItem } from '../feedback/NotificationBell'
import { UserMenu } from '../feedback/UserMenu'
import styles from './AppShell.module.css'

const { Sider, Header: LayoutHeader, Content } = Layout

export interface AppShellNavItem {
  key: string
  label: string
  href: string
  icon?: ReactNode
}

interface AppShellUser {
  name: string
  role: UserRole
  avatarUrl?: string
}

/** Props de {@link AppShell}. */
interface AppShellProps {
  /** Ítems de navegación — armados por rol en `apps/web` (ver `navConfig`). */
  navItems: AppShellNavItem[]
  /** `key` del ítem de navegación activo. */
  activeKey: string
  user: AppShellUser
  notifications?: NotificationItem[]
  onLogout?: () => void
  children: ReactNode
  /** Igual que en `AuthLayout`: `min-height: 100%` en vez de `100vh`, para previsualizarlo acotado. */
  compact?: boolean
  'data-testid'?: string
}

/**
 * Layout base de los paneles autenticados (locador, locatario, garante,
 * admin): sidebar con el menú (fijo en desktop, `Drawer` en mobile) +
 * header con campanita de notificaciones y menú de usuario + área de
 * contenido. La navegación se recibe por props — este componente no sabe
 * nada de rutas de RentAR en particular.
 */
export function AppShell({
  navItems,
  activeKey,
  user,
  notifications = [],
  onLogout,
  children,
  compact = false,
  ...rest
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = navItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: (
      <Link href={item.href} onClick={() => setMobileOpen(false)}>
        {item.label}
      </Link>
    ),
  }))

  return (
    <Layout className={`${styles.layout} ${compact ? styles.layoutCompact : ''}`} {...rest}>
      <Sider width={240} className={styles.sider}>
        <div className={styles.logoWrap}>
          <Image src={logo} alt="RentAR" style={{ height: '2rem', width: 'auto' }} />
        </div>
        <Menu mode="inline" selectedKeys={[activeKey]} items={menuItems} style={{ borderInlineEnd: 'none' }} />
      </Sider>

      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        closable={false}
        size={240}
        styles={{ body: { padding: 0 } }}
      >
        <div className={styles.logoWrap}>
          <Image src={logo} alt="RentAR" style={{ height: '2rem', width: 'auto' }} />
        </div>
        <Menu mode="inline" selectedKeys={[activeKey]} items={menuItems} style={{ borderInlineEnd: 'none' }} />
      </Drawer>

      <Layout>
        <LayoutHeader className={styles.header}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
            data-testid="app-shell-menu-toggle"
          >
            <MenuOutlined />
          </button>
          <div className={styles.headerActions}>
            <NotificationBell notifications={notifications} />
            <UserMenu name={user.name} role={user.role} avatarUrl={user.avatarUrl} onLogout={onLogout} />
          </div>
        </LayoutHeader>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}
