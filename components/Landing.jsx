'use client'

import { useMemo, useState } from 'react'
import { Button } from 'antd'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import PropertyGrid from './PropertyGrid'
import { properties } from '@/lib/data/properties.mock'
import { defaultFilters } from '@/lib/types/filters'
import styles from './Landing.module.css'

const PREVIEW_LIMIT = 8

function matchesFilters(property, filters) {
  if (filters.neighborhoodSlug !== 'todos' && property.neighborhoodSlug !== filters.neighborhoodSlug) {
    return false
  }
  if (property.priceMonthly > filters.maxPrice) {
    return false
  }
  if (filters.minPrice != null && property.priceMonthly < filters.minPrice) {
    return false
  }
  if (filters.type !== 'todos' && property.type !== filters.type) {
    return false
  }
  if (filters.bedrooms !== 'todos') {
    if (filters.bedrooms === 3) {
      if (property.bedrooms < 3) return false
    } else if (property.bedrooms !== filters.bedrooms) {
      return false
    }
  }
  if (filters.characteristics.length > 0) {
    const hasAll = filters.characteristics.every((c) => property.characteristics.includes(c))
    if (!hasAll) return false
  }
  return true
}

export default function Landing() {
  const [filters, setFilters] = useState(defaultFilters)

  const filteredProperties = useMemo(
    () => properties.filter((property) => matchesFilters(property, filters)),
    [filters],
  )

  return (
    <>
      <Header />
      <main>
        <Hero filters={filters} onChange={setFilters} resultCount={filteredProperties.length} />

        <section className={styles.section}>
          <h2 className={styles.heading}>Propiedades disponibles cerca tuyo en Córdoba</h2>
          <PropertyGrid properties={filteredProperties.slice(0, PREVIEW_LIMIT)} />
          <div className={styles.moreWrap}>
            <Button type="primary" size="large">
              Buscar más propiedades
            </Button>
          </div>
        </section>

        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
