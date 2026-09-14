'use client'

import { useInView } from '@/hooks/useInView'
import styles from './HowItWorks.module.css'

const steps = [
  {
    title: 'Buscá',
    description: 'Filtrá por zona, precio y tipología entre publicaciones directas de dueños.',
  },
  {
    title: 'Contactá al dueño',
    description: 'Postulate y coordiná todo por mensajería dentro de la plataforma.',
  },
  {
    title: 'Firmá el contrato',
    description: 'Suscribí el contrato con firma electrónica, aunque estés en otra ciudad.',
  },
  {
    title: 'Pagá con trazabilidad',
    description: 'Registrá cada pago y el ajuste por IPC/ICL queda calculado automáticamente.',
  },
]

function StepNode({ step, index }) {
  const { ref, inView } = useInView(0.4)

  return (
    <li
      ref={ref}
      className={`${styles.step} ${inView ? styles.stepVisible : styles.stepHidden}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <span className={styles.node}>{index + 1}</span>
      <div className={styles.content}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.description}</p>
      </div>
    </li>
  )
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>De la búsqueda a las llaves, sin intermediarios</h2>

        <ol className={styles.list}>
          <span aria-hidden="true" className={styles.connector} />
          {steps.map((step, index) => (
            <StepNode key={step.title} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  )
}
