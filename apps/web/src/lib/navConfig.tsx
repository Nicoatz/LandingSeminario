import {
  BankOutlined,
  BarChartOutlined,
  CrownOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
  KeyOutlined,
  MessageOutlined,
  TeamOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import type { AppShellNavItem } from '@rentar/ui'
import type { UserRole } from '@rentar/shared-types'

/**
 * Estructura de navegación de `AppShell` por rol. Documenta el árbol de
 * información previsto para el panel — todavía no hay páginas reales
 * detrás de estas rutas, se crean en un paso siguiente a partir de los
 * diseños de Claude Design. No es un router funcional, es solo datos.
 */
export const navConfigByRole: Record<UserRole, AppShellNavItem[]> = {
  locador: [
    { key: 'inicio', label: 'Inicio', href: '/panel/locador', icon: <HomeOutlined /> },
    { key: 'propiedades', label: 'Propiedades', href: '/panel/locador/propiedades', icon: <BankOutlined /> },
    { key: 'contratos', label: 'Contratos', href: '/panel/locador/contratos', icon: <FileTextOutlined /> },
    { key: 'cobros', label: 'Cobros', href: '/panel/locador/cobros', icon: <DollarOutlined /> },
    { key: 'reclamos', label: 'Reclamos', href: '/panel/locador/reclamos', icon: <WarningOutlined /> },
    { key: 'mensajes', label: 'Mensajes', href: '/panel/locador/mensajes', icon: <MessageOutlined /> },
    { key: 'reportes', label: 'Reportes', href: '/panel/locador/reportes', icon: <BarChartOutlined /> },
    { key: 'suscripcion', label: 'Suscripción', href: '/panel/locador/suscripcion', icon: <CrownOutlined /> },
  ],
  locatario: [
    { key: 'inicio', label: 'Inicio', href: '/panel/locatario', icon: <HomeOutlined /> },
    { key: 'mi-alquiler', label: 'Mi alquiler', href: '/panel/locatario/mi-alquiler', icon: <FileTextOutlined /> },
    { key: 'pagos', label: 'Pagos', href: '/panel/locatario/pagos', icon: <DollarOutlined /> },
    { key: 'reclamos', label: 'Reclamos', href: '/panel/locatario/reclamos', icon: <WarningOutlined /> },
    { key: 'mensajes', label: 'Mensajes', href: '/panel/locatario/mensajes', icon: <MessageOutlined /> },
  ],
  garante: [
    {
      key: 'contratos-a-firmar',
      label: 'Contratos a firmar',
      href: '/panel/garante/contratos-a-firmar',
      icon: <KeyOutlined />,
    },
  ],
  admin: [
    { key: 'usuarios', label: 'Usuarios', href: '/panel/admin/usuarios', icon: <TeamOutlined /> },
    { key: 'reportes', label: 'Reportes', href: '/panel/admin/reportes', icon: <BarChartOutlined /> },
  ],
}
