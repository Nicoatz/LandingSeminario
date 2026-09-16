import type { ReactNode } from 'react'
import Image from 'next/image'
import logo from '../../assets/logo-rentar.svg'
import styles from './AuthLayout.module.css'

/** Props de {@link AuthLayout}. */
interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  'data-testid'?: string
}

/** Layout de login/registro: tarjeta centrada con el logo, título y el formulario. */
export function AuthLayout({ title, subtitle, children, ...rest }: AuthLayoutProps) {
  return (
    <div className={styles.wrap} {...rest}>
      <div className={styles.card}>
        <Image src={logo} alt="RentAR" className={styles.logo} priority />
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
