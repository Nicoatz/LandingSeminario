'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import logo from '@/assets/logo-rentar.svg'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.logoLink}>
          <Image src={logo} alt="RentAR" style={{ height: '2.75rem', width: 'auto' }} priority />
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            RentAR — inicio
          </span>
        </a>

        <nav aria-label="Navegación principal" className={styles.nav}>
          <a href="#buscar">Buscar propiedades</a>
          <a href="#como-funciona">Cómo funciona</a>
          <Link href="/design-system">Sistema de diseño</Link>
        </nav>

        <div className={styles.desktopActions}>
          <Button type="text" style={{ color: '#004D98', fontWeight: 600 }}>
            Iniciar sesión
          </Button>
          <Button type="primary">Publicar propiedad</Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(true)}
        >
          <MenuOutlined style={{ fontSize: 20 }} />
        </button>
      </div>

      <Drawer
        id="mobile-menu"
        title={<Image src={logo} alt="RentAR" style={{ height: '2.25rem', width: 'auto' }} />}
        placement="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        closeIcon={<CloseOutlined />}
        size={280}
      >
        <nav aria-label="Navegación móvil" className={styles.drawerNav}>
          <a href="#buscar" onClick={() => setMenuOpen(false)}>
            Buscar propiedades
          </a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
            Cómo funciona
          </a>
          <Link href="/design-system" onClick={() => setMenuOpen(false)}>
            Sistema de diseño
          </Link>
          <div className={styles.drawerActions}>
            <Button type="text" style={{ color: '#004D98', fontWeight: 600, textAlign: 'left' }} block>
              Iniciar sesión
            </Button>
            <Button type="primary" block>
              Publicar propiedad
            </Button>
          </div>
        </nav>
      </Drawer>
    </header>
  )
}
