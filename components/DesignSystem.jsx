'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Select, Slider, Tag } from 'antd'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import PropertyCard from './PropertyCard'
import SearchBar from './SearchBar'
import ProcessLoopMotif from './ProcessLoopMotif'
import HowItWorks from './HowItWorks'
import { properties } from '@/lib/data/properties.mock'
import { neighborhoods } from '@/lib/data/neighborhoods'
import { defaultFilters, MAX_PRICE_CEILING } from '@/lib/types/filters'
import { formatMonthlyPrice } from '@/lib/utils/format'
import styles from './DesignSystem.module.css'

const sections = [
  { id: 'vision-general', label: 'Visión general' },
  { id: 'colores', label: 'Colores' },
  { id: 'tipografia', label: 'Tipografía' },
  { id: 'espaciado', label: 'Espaciado' },
  { id: 'sombras', label: 'Sombras y elevación' },
  { id: 'formas', label: 'Formas y radios' },
  { id: 'botones', label: 'Botones' },
  { id: 'dropdowns', label: 'Dropdowns' },
  { id: 'slider', label: 'Barra deslizable' },
  { id: 'chips', label: 'Chips' },
  { id: 'tarjetas', label: 'Tarjetas' },
  { id: 'campos', label: 'Campos y buscador' },
  { id: 'navegacion', label: 'Navegación' },
  { id: 'insignia', label: 'Componente insignia' },
  { id: 'reglas', label: "Do's y Don'ts" },
]

const colors = [
  {
    name: 'Azul Escribanía',
    hex: '#004D98',
    text: '#ffffff',
    usage: 'Botones primarios, links, estados activos de filtros, foco, íconos dentro de nodos blancos.',
  },
  {
    name: 'Azul Escribanía Oscuro',
    hex: '#003B74',
    text: '#ffffff',
    usage: 'Hover/activo del azul primario. Nunca se usa en reposo.',
  },
  {
    name: 'Dorado Trámite',
    hex: '#D7B15D',
    text: '#12202E',
    usage: 'Atmósfera: selección de texto, trazo del anillo guía del hero. Nunca para texto pequeño.',
  },
  {
    name: 'Dorado Trámite (texto)',
    hex: '#8C6B1D',
    text: '#ffffff',
    usage: 'Único dorado apto para texto — el precio en las tarjetas de propiedad.',
  },
  {
    name: 'Celeste Cordobés',
    hex: '#A0D1EF',
    text: '#12202E',
    usage: 'Atmósfera: fondos de sección, degradé del buscador. Nunca para texto ni íconos.',
  },
  {
    name: 'Celeste Cordobés Claro',
    hex: '#E3F2FB',
    text: '#12202E',
    usage: 'Hover de botones secundarios, chips y fondo de "Cómo funciona".',
  },
  {
    name: 'Ink',
    hex: '#12202E',
    text: '#ffffff',
    usage: 'Texto de cuerpo, siempre a 70% de opacidad o más. También hairlines a baja opacidad.',
  },
  {
    name: 'Paper',
    hex: '#F7F9FB',
    text: '#12202E',
    usage: 'Fondo de página. Las tarjetas se apoyan encima en blanco sólido.',
  },
]

const typeSpecimens = [
  {
    name: 'Display',
    sample: 'Alquilá directo, sin inmobiliaria',
    style: {
      fontSize: 'clamp(2.25rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
    },
    spec: ['700', '36–48px', 'line-height 1.05', 'tracking -0.025em'],
    usage: 'H1 del hero únicamente.',
  },
  {
    name: 'Headline',
    sample: 'De la búsqueda a las llaves, sin intermediarios',
    style: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    spec: ['700', '24–36px', 'line-height 1.2', 'tracking -0.015em'],
    usage: 'H2 de sección.',
  },
  {
    name: 'Title',
    sample: 'Monoambiente luminoso a metros de Plaza España',
    style: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    spec: ['600', '18px', 'line-height 1.4'],
    usage: 'Títulos de tarjeta, H3 de pasos del timeline.',
  },
  {
    name: 'Body',
    sample: 'Filtrá por zona, precio y tipología entre publicaciones directas de dueños.',
    style: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
    spec: ['400', '16px', 'line-height 1.5'],
    usage: 'Párrafos cortos (2–3 líneas), no de artículo.',
  },
  {
    name: 'Label',
    sample: 'Dormitorios · m² · Ajuste por ICL',
    style: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.4 },
    spec: ['600', '14px', 'line-height 1.4'],
    usage: 'Nav, labels de formulario, texto de botón, metadatos de tarjeta.',
  },
]

const spacing = [
  { name: 'xs', value: '0.5rem', px: 8 },
  { name: 'sm', value: '1rem', px: 16 },
  { name: 'md', value: '1.5rem', px: 24 },
  { name: 'lg', value: '2.5rem', px: 40 },
  { name: 'xl', value: '4rem', px: 64 },
]

const doList = [
  'Mantener el dorado (#D7B15D / #8C6B1D) atado solo a dinero/valor: la línea de precio y el highlight de selección.',
  'Usar rounded-full en todo botón/badge/chip y rounded-2xl/rounded-3xl en contenedores — ningún otro radio.',
  'Animar la entrada/salida de una sección con un IntersectionObserver persistente que alterne en ambos sentidos.',
  'Envolver un elemento con animación de transform CSS en un <g> estático si el mismo nodo SVG tiene un atributo transform.',
]

const dontList = [
  'Poner un "kicker" en mayúsculas justo arriba de un H1/H2/H3 — nunca, por más tentador que sea.',
  'Construir una sección nueva como una fila de tarjetas idénticas ícono + título + párrafo.',
  'Usar ink/60, ink/50 o el dorado crudo para texto de cualquier tamaño — caen debajo del piso de contraste 4.5:1.',
  'Sumar una segunda tipografía, un acento de borde de color, texto en degradé o una sombra dura tipo neobrutalista.',
]

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

function DropdownsDemo() {
  const [neighborhoodSlug, setNeighborhoodSlug] = useState('todos')
  const [type, setType] = useState('todos')

  return (
    <div className={styles.chipDemoCard}>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="ds-filtro-barrio" className={styles.fieldLabel}>
            Zona
          </label>
          <Select
            id="ds-filtro-barrio"
            className={styles.fieldControl}
            value={neighborhoodSlug}
            onChange={setNeighborhoodSlug}
            options={[
              { value: 'todos', label: 'Todos los barrios' },
              ...neighborhoods.map((n) => ({ value: n.slug, label: n.name })),
            ]}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="ds-filtro-tipologia" className={styles.fieldLabel}>
            Tipología
          </label>
          <Select
            id="ds-filtro-tipologia"
            className={styles.fieldControl}
            value={type}
            onChange={setType}
            options={[
              { value: 'todos', label: 'Todas' },
              { value: 'departamento', label: 'Departamento' },
              { value: 'casa', label: 'Casa' },
              { value: 'ph', label: 'PH' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function SliderDemo() {
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_CEILING)

  return (
    <div className={styles.chipDemoCard}>
      <label htmlFor="ds-filtro-precio" className={styles.fieldLabel}>
        Precio máximo: <span className={styles.fieldLabelValue}>{formatMonthlyPrice(maxPrice)}</span>
      </label>
      <Slider
        id="ds-filtro-precio"
        min={400000}
        max={MAX_PRICE_CEILING}
        step={5000}
        value={maxPrice}
        onChange={setMaxPrice}
        tooltip={{ formatter: (value) => formatMonthlyPrice(value ?? 0) }}
      />
    </div>
  )
}

function ChipsDemo() {
  const [selected, setSelected] = useState(['amoblado'])
  const options = [
    { value: 'amoblado', label: 'Amoblado' },
    { value: 'mascotas', label: 'Acepta mascotas' },
    { value: 'cochera', label: 'Cochera' },
    { value: 'balcon', label: 'Balcón' },
  ]

  return (
    <div className={styles.chipDemoCard}>
      <Tag.CheckableTagGroup
        multiple
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  )
}

export default function DesignSystem() {
  const activeId = useScrollSpy(sections.map((s) => s.id))
  const demoProperty = properties[0]

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <p className={styles.topbarTitle}>Sistema de Diseño</p>
          <span className={styles.badge}>RentAR</span>
        </div>
        <Link href="/" className={styles.backLink}>
          ← Volver al sitio
        </Link>
      </header>

      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Secciones del sistema de diseño">
          <ul className={styles.sidebarList}>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`${styles.sidebarLink} ${activeId === section.id ? styles.sidebarLinkActive : ''}`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.content}>
          <div id="vision-general" className={styles.intro}>
            <h1 className={styles.eyebrowless}>Sistema de Diseño de RentAR</h1>
            <p className={styles.lead}>
              Referencia visual e interactiva de los tokens y componentes que arman la landing:
              colores, tipografía, espaciado, sombras, formas y los patrones de uso reales, tomados
              directamente de los componentes en producción.
            </p>

            <div className={styles.quoteCard}>
              <p className={styles.quoteLabel}>Norte creativo</p>
              <p className={styles.quoteText}>&ldquo;El trato directo&rdquo;</p>
              <p className={styles.sectionLead} style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                Todo el lenguaje visual de RentAR existe para que una cosa se sienta cierta a
                simple vista: estás tratando con un dueño real, no con el mostrador de una
                inmobiliaria. Ninguna superficie busca parecer un portal inmobiliario grande;
                parece un escritorio honesto, bien llevado.
              </p>
              <ul className={styles.characteristicsList}>
                <li>Azul institucional profundo como único color "fuerte" para lo interactivo; dorado reservado para dinero/valor.</li>
                <li>Redondeo grande y consistente — pill buttons, contenedores rounded-2xl/3xl — nunca esquinas rectas.</li>
                <li>Tarjetas blancas suavemente elevadas sobre una página apenas fuera de blanco.</li>
                <li>Un solo momento de movimiento autoral por vista (loop del hero; timeline con scroll-reveal).</li>
                <li>League Spartan en todo el sistema — nunca una tipografía secundaria.</li>
              </ul>
            </div>
          </div>

          {/* Colores */}
          <section id="colores" className={styles.section}>
            <h2 className={styles.sectionHeading}>Colores</h2>
            <p className={styles.sectionLead}>
              La paleta es chica y está codificada por función: el azul lleva toda acción
              clicable/primaria, el dorado aparece solo donde se comunica dinero o valor, el
              celeste es atmósfera (fondos, dividers, hover) y nunca texto.
            </p>
            <div className={styles.colorGrid}>
              {colors.map((color) => (
                <div key={color.hex} className={styles.swatchCard}>
                  <div
                    className={styles.swatchColor}
                    style={{ background: color.hex, color: color.text }}
                  >
                    {color.hex}
                  </div>
                  <div className={styles.swatchMeta}>
                    <p className={styles.swatchName}>{color.name}</p>
                    <p className={styles.swatchUsage}>{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ruleCallout}>
              <strong>La regla del dinero-es-dorado.</strong> El dorado aparece exactamente donde
              hay moneda (la línea de precio) y en ningún otro lugar como color de contenido.
            </div>
            <div className={styles.ruleCallout}>
              <strong>La regla de contraste.</strong> Ningún texto sobre superficie clara baja de
              ink/70 (≈6.1:1 sobre blanco/paper) o de brand-gold-ink para texto dorado (≈4.96:1).
              ink/60, ink/50 y el dorado crudo son correctos para rellenos decorativos grandes,
              pero nunca para texto chico.
            </div>
          </section>

          {/* Tipografía */}
          <section id="tipografia" className={styles.section}>
            <h2 className={styles.sectionHeading}>Tipografía</h2>
            <p className={styles.sectionLead}>
              League Spartan, con system-ui/sans-serif como respaldo — una sola familia para todo
              el sistema, en distintos pesos y tamaños únicamente.
            </p>
            <div>
              {typeSpecimens.map((spec) => (
                <div key={spec.name} className={styles.typeSpecimen}>
                  <p className={styles.typeSample} style={spec.style}>
                    {spec.sample}
                  </p>
                  <div className={styles.typeMeta}>
                    <span className={styles.typeMetaName}>{spec.name}</span>
                    {spec.spec.map((s) => (
                      <code key={s}>{s}</code>
                    ))}
                    <span>{spec.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Espaciado */}
          <section id="espaciado" className={styles.section}>
            <h2 className={styles.sectionHeading}>Espaciado</h2>
            <p className={styles.sectionLead}>
              Escala reducida de cinco pasos usada en paddings, gaps y márgenes de sección.
            </p>
            <div className={styles.spacingList}>
              {spacing.map((s) => (
                <div key={s.name} className={styles.spacingRow}>
                  <span className={styles.spacingLabel}>{s.name}</span>
                  <div className={styles.spacingBar} style={{ width: `${s.px * 2}px` }} />
                  <span className={styles.spacingValue}>{s.value} · {s.px}px</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sombras */}
          <section id="sombras" className={styles.section}>
            <h2 className={styles.sectionHeading}>Sombras y elevación</h2>
            <p className={styles.sectionLead}>
              Suavemente elevado. La profundidad separa una tarjeta de la página, nunca llama la
              atención por sí sola. Un shadow solo aparece sobre algo accionable o la pieza
              insignia del hero.
            </p>
            <div className={styles.demoGrid}>
              <div className={styles.demoCell}>
                <div className={`${styles.demoBox} ${styles.shadowResting}`} />
                <span className={styles.demoCaption}>Tarjeta en reposo</span>
                <p className={styles.demoSub}>shadow-sm + ring-black/5</p>
              </div>
              <div className={styles.demoCell}>
                <div className={`${styles.demoBox} ${styles.shadowLifted}`} />
                <span className={styles.demoCaption}>Tarjeta en hover</span>
                <p className={styles.demoSub}>shadow-lg + -translate-y-1</p>
              </div>
              <div className={styles.demoCell}>
                <div className={`${styles.demoBox} ${styles.shadowButton}`} />
                <span className={styles.demoCaption}>Sombra de botón</span>
                <p className={styles.demoSub}>shadow-brand-blue/20</p>
              </div>
              <div className={styles.demoCell}>
                <div className={`${styles.demoBox} ${styles.shadowDeep}`} />
                <span className={styles.demoCaption}>Contenedor profundo</span>
                <p className={styles.demoSub}>shadow-2xl shadow-brand-blue/20</p>
              </div>
            </div>
          </section>

          {/* Formas */}
          <section id="formas" className={styles.section}>
            <h2 className={styles.sectionHeading}>Formas y radios</h2>
            <p className={styles.sectionLead}>
              El redondeo es grande y consistente, nunca filoso. Los bordes son hairlines
              únicamente — nunca un borde grueso o de color.
            </p>
            <div className={styles.demoGrid}>
              <div className={styles.demoCell}>
                <div className={`${styles.radiusBox} ${styles.radiusPill}`} />
                <span className={styles.demoCaption}>Pill · 9999px</span>
                <p className={styles.demoSub}>Botones, badges, chips</p>
              </div>
              <div className={styles.demoCell}>
                <div className={`${styles.radiusBox} ${styles.radiusMd}`} />
                <span className={styles.demoCaption}>Medium · 1rem</span>
                <p className={styles.demoSub}>Tarjetas, panel del buscador</p>
              </div>
              <div className={styles.demoCell}>
                <div className={`${styles.radiusBox} ${styles.radiusLg}`} />
                <span className={styles.demoCaption}>Large · 1.5rem</span>
                <p className={styles.demoSub}>Motivo del hero, la superficie más grande</p>
              </div>
            </div>
          </section>

          {/* Botones */}
          <section id="botones" className={styles.section}>
            <h2 className={styles.sectionHeading}>Botones</h2>
            <p className={styles.sectionLead}>
              Forma pill siempre — ningún botón cuadrado o levemente redondeado en todo el
              sistema.
            </p>
            <div className={styles.buttonRow}>
              <Button type="primary" size="large">
                Publicar propiedad
              </Button>
              <Button className={styles.secondaryButton} size="large">
                Ver cómo funciona
              </Button>
              <Button type="text" style={{ color: '#004D98', fontWeight: 600 }}>
                Iniciar sesión
              </Button>
            </div>
            <p className={styles.placeholderNote + ' ' + styles.demoSub}>
              El hover del primario oscurece a Azul Escribanía Oscuro; el foco siempre usa un
              contorno de 2px en Azul Escribanía con 2px de offset.
            </p>
          </section>

          {/* Dropdowns */}
          <section id="dropdowns" className={styles.section}>
            <h2 className={styles.sectionHeading}>Dropdowns</h2>
            <p className={styles.sectionLead}>
              Fondo paper (no blanco) para sensación de inset dentro de la tarjeta blanca, borde
              hairline y radio pequeño (rounded-lg). El foco cambia el borde a azul, sin glow. Es
              el mismo componente que arma los selects "Zona" y "Tipología" del buscador.
            </p>
            <DropdownsDemo />
          </section>

          {/* Slider */}
          <section id="slider" className={styles.section}>
            <h2 className={styles.sectionHeading}>Barra deslizable (slider)</h2>
            <p className={styles.sectionLead}>
              Input nativo estilizado con accent-brand-blue. El valor actual siempre se repite en
              el texto del label — nunca queda escondido detrás de la posición del thumb.
            </p>
            <SliderDemo />
          </section>

          {/* Chips */}
          <section id="chips" className={styles.section}>
            <h2 className={styles.sectionHeading}>Chips</h2>
            <p className={styles.sectionLead}>
              Pill, borde por default; el estado seleccionado invierte a azul sólido. Una sola
              forma de chip para filtros y para cualquier otra selección múltiple.
            </p>
            <ChipsDemo />
          </section>

          {/* Tarjetas */}
          <section id="tarjetas" className={styles.section}>
            <h2 className={styles.sectionHeading}>Tarjetas</h2>
            <p className={styles.sectionLead}>
              Fondo blanco sólido sobre la página paper, ring hairline en vez de borde visible,
              elevación solo en hover.
            </p>
            <div className={styles.liveFrame}>
              <div className={styles.liveFrameLabel}>
                <span className={styles.liveFrameDot} />
                components/PropertyCard.jsx (ejemplo real)
              </div>
              <div className={styles.liveFramePadded}>
                <div className={styles.cardDemoWrap}>
                  <PropertyCard property={demoProperty} />
                </div>
              </div>
            </div>
          </section>

          {/* Campos */}
          <section id="campos" className={styles.section}>
            <h2 className={styles.sectionHeading}>Campos y buscador</h2>
            <p className={styles.sectionLead}>
              Inputs sobre fondo paper (no blanco) para una sensación de inset dentro de la
              tarjeta blanca del buscador; el foco cambia el borde a azul, sin glow.
            </p>
            <div className={styles.liveFrame}>
              <div className={styles.liveFrameLabel}>
                <span className={styles.liveFrameDot} />
                components/SearchBar.jsx (interactivo)
              </div>
              <div className={styles.liveFramePadded}>
                <SearchBar
                  filters={defaultFilters}
                  onChange={() => {}}
                  resultCount={properties.length}
                />
              </div>
            </div>
          </section>

          {/* Navegación */}
          <section id="navegacion" className={styles.section}>
            <h2 className={styles.sectionHeading}>Navegación</h2>
            <p className={styles.sectionLead}>
              Links de texto a escala label, sin subrayado en reposo ni en hover. El header
              colapsa a un menú hamburguesa por debajo de md.
            </p>
            <div className={styles.navDemo}>
              <a className={styles.navDemoLink} href="#campos">
                Buscar propiedades
              </a>
              <a className={styles.navDemoLink} href="#insignia">
                Cómo funciona
              </a>
              <Button type="text" style={{ color: '#004D98', fontWeight: 600 }}>
                Iniciar sesión
              </Button>
              <Button type="primary">Publicar propiedad</Button>
            </div>
          </section>

          {/* Componente insignia */}
          <section id="insignia" className={styles.section}>
            <h2 className={styles.sectionHeading}>Componente insignia: el loop de proceso</h2>
            <p className={styles.sectionLead}>
              Dos piezas hechas a medida llevan la única idea de movimiento autoral del sistema, y
              deliberadamente reflejan la misma estructura de 4 etapas: buscar → contactar →
              firmar → pagar.
            </p>
            <div className={styles.loopFrame}>
              <ProcessLoopMotif />
            </div>

            <p className={styles.subheading}>HowItWorks (ejemplo real, con scroll-reveal)</p>
            <div className={styles.liveFrame}>
              <div className={styles.liveFrameLabel}>
                <span className={styles.liveFrameDot} />
                components/HowItWorks.jsx
              </div>
              <HowItWorks />
            </div>
          </section>

          {/* Reglas */}
          <section id="reglas" className={styles.section}>
            <h2 className={styles.sectionHeading}>Do&apos;s y Don&apos;ts</h2>
            <p className={styles.sectionLead}>
              Reglas nombradas del sistema, para juzgar casos límite sin perder la coherencia
              visual.
            </p>
            <div className={styles.rulesGrid}>
              <div className={styles.rulesCard}>
                <p className={`${styles.rulesTitle} ${styles.rulesTitleDo}`}>
                  <CheckCircleFilled /> Hacer
                </p>
                <ul className={styles.rulesList}>
                  {doList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.rulesCard}>
                <p className={`${styles.rulesTitle} ${styles.rulesTitleDont}`}>
                  <CloseCircleFilled /> No hacer
                </p>
                <ul className={styles.rulesList}>
                  {dontList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <p className={styles.footer}>
            Fuente de verdad: <code>DESIGN.md</code>. Esta página se genera a partir de los mismos
            tokens y componentes usados en producción.
          </p>
        </main>
      </div>
    </div>
  )
}
