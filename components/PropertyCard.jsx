import Image from 'next/image'
import { Button, Card } from 'antd'
import { formatMonthlyPrice } from '@/lib/utils/format'
import styles from './PropertyCard.module.css'

const typeLabels = {
  departamento: 'Departamento',
  casa: 'Casa',
  ph: 'PH',
}

export default function PropertyCard({ property }) {
  return (
    <Card
      hoverable
      cover={
        <div className={styles.imageWrap}>
          <Image
            src={property.image}
            alt={`${typeLabels[property.type]} en ${property.neighborhoodName}`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
          <span className={styles.badge}>Trato directo con el dueño</span>
        </div>
      }
    >
      <h3 className={styles.title}>{property.title}</h3>
      <p className={styles.subtitle}>
        {property.neighborhoodName} · {typeLabels[property.type]}
      </p>

      <div className={styles.metaRow}>
        <span>
          {property.bedrooms} {property.bedrooms === 1 ? 'dormitorio' : 'dormitorios'}
        </span>
        <span>{property.areaM2} m²</span>
        <span>Ajuste por {property.adjustmentIndex}</span>
      </div>

      <div className={styles.footerRow}>
        <p className={styles.price}>{formatMonthlyPrice(property.priceMonthly)}</p>
        <Button size="small" style={{ background: '#E3F2FB', color: '#004D98', border: 'none' }}>
          Ver detalle
        </Button>
      </div>
    </Card>
  )
}
