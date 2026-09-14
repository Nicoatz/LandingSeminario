import { Button } from 'antd'
import ProcessLoopMotif from './ProcessLoopMotif'
import SearchBar from './SearchBar'
import styles from './Hero.module.css'

export default function Hero({ filters, onChange, resultCount }) {
  return (
    <section id="inicio" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.title}>Alquilá directo con el dueño, sin inmobiliaria</h1>
            <p className={styles.subtitle}>
              Buscá propiedades publicadas por sus propios dueños en Córdoba, contratá a
              distancia con firma electrónica y llevá un registro claro de pagos y ajustes.
            </p>
            <p className={styles.pilot}>Piloto en Córdoba Capital</p>
            <div className={styles.ctaRow}>
              <Button type="primary" size="large" href="#buscar">
                Buscar propiedades
              </Button>
              <Button size="large" href="#como-funciona" className={styles.ghostButton}>
                Ver cómo funciona
              </Button>
            </div>
          </div>

          <ProcessLoopMotif className={styles.motif} />
        </div>
      </div>

      <div className={styles.searchWrap}>
        <SearchBar filters={filters} onChange={onChange} resultCount={resultCount} />
      </div>
    </section>
  )
}
