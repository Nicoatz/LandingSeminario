'use client'

import { Card, Col, InputNumber, Row, Select, Slider, Tag } from 'antd'
import { characteristicOptions } from '@/lib/data/properties.mock'
import { neighborhoods } from '@/lib/data/neighborhoods'
import { MAX_PRICE_CEILING } from '@/lib/types/filters'
import { formatMonthlyPrice } from '@/lib/utils/format'
import styles from './SearchBar.module.css'

export default function SearchBar({ filters, onChange, resultCount }) {
  return (
    <Card id="buscar" className={styles.card}>
      <div className={styles.priceRowsWrap}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} lg={8}>
            <label htmlFor="filtro-barrio" className={styles.label}>
              Zona
            </label>
            <Select
              id="filtro-barrio"
              className={styles.control}
              value={filters.neighborhoodSlug}
              onChange={(value) => onChange({ ...filters, neighborhoodSlug: value })}
              options={[
                { value: 'todos', label: 'Todos los barrios' },
                ...neighborhoods.map((n) => ({ value: n.slug, label: n.name })),
              ]}
            />
          </Col>

          <Col xs={24} sm={8} lg={8}>
            <label htmlFor="filtro-tipologia" className={styles.label}>
              Tipología
            </label>
            <Select
              id="filtro-tipologia"
              className={styles.control}
              value={filters.type}
              onChange={(value) => onChange({ ...filters, type: value })}
              options={[
                { value: 'todos', label: 'Todas' },
                { value: 'departamento', label: 'Departamento' },
                { value: 'casa', label: 'Casa' },
                { value: 'ph', label: 'PH' },
              ]}
            />
          </Col>

          <Col xs={24} sm={8} lg={8}>
            <label htmlFor="filtro-dormitorios" className={styles.label}>
              Dormitorios
            </label>
            <Select
              id="filtro-dormitorios"
              className={styles.control}
              value={String(filters.bedrooms)}
              onChange={(value) =>
                onChange({
                  ...filters,
                  bedrooms: value === 'todos' ? 'todos' : Number(value),
                })
              }
              options={[
                { value: 'todos', label: 'Todos' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3 o más' },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={24}>
            <label htmlFor="filtro-precio-hibrido" className={styles.label}>
              Precio mensual
            </label>
            <div className={styles.priceInline}>
              <InputNumber
                className={styles.priceInlineInput}
                controls={false}
                min={0}
                max={filters.maxPrice ?? 1000000}
                step={5000}
                value={filters.minPrice ?? 400000}
                onChange={(value) => onChange({ ...filters, minPrice: value ?? 0 })}
                formatter={(value) => (value === undefined || value === null ? '' : `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                parser={(value) => value.replace(/\$\s?|(\.)/g, '')}
                aria-label="Precio mínimo"
              />
              <Slider
                id="filtro-precio-hibrido"
                range
                className={`${styles.slider} ${styles.priceInlineSlider}`}
                min={400000}
                max={1000000}
                step={5000}
                value={[filters.minPrice ?? 400000, filters.maxPrice]}
                onChange={(value) => onChange({ ...filters, minPrice: value[0], maxPrice: value[1] })}
                tooltip={{ formatter: (value) => formatMonthlyPrice(value ?? 0) }}
              />
              <InputNumber
                className={styles.priceInlineInput}
                controls={false}
                min={filters.minPrice ?? 0}
                max={1000000}
                step={5000}
                value={filters.maxPrice}
                onChange={(value) => onChange({ ...filters, maxPrice: value ?? 1000000 })}
                formatter={(value) => (value === undefined || value === null ? '' : `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                parser={(value) => value.replace(/\$\s?|(\.)/g, '')}
                aria-label="Precio máximo"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.characteristics}>
        <p className={styles.legend} id="caracteristicas-legend">
          Características
        </p>
        <Tag.CheckableTagGroup
          multiple
          aria-labelledby="caracteristicas-legend"
          options={characteristicOptions.map((c) => ({ value: c.key, label: c.label }))}
          value={filters.characteristics}
          onChange={(values) => onChange({ ...filters, characteristics: values })}
        />
      </div>

      <p className={styles.resultCount} role="status">
        {resultCount} {resultCount === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
      </p>
    </Card>
  )
}
