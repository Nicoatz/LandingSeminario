# RentAR — guía del monorepo

> **Antes de tocar código de `apps/web`:** leé `apps/web/CLAUDE.md` (→ `apps/web/AGENTS.md`). La
> versión de Next.js de este monorepo (16.x) tiene breaking changes respecto de lo que un LLM
> entrenado con versiones anteriores conoce. `apps/web/AGENTS.md` lo re-escribe automáticamente
> `next dev` (corre con cwd=`apps/web`) — no lo edites a mano, y si aparece como cambio sin
> commitear después de correr `next dev`, commiteálo.

## Qué es RentAR

RentAR es una plataforma web para gestionar alquileres residenciales de larga duración
directamente entre locador, locatario y garante, sin inmobiliaria. El piloto es la ciudad de
Córdoba, Argentina. Ver el detalle completo en [`docs/PRODUCT.md`](docs/PRODUCT.md) (producto,
usuarios, alcance) y [`docs/DESIGN.md`](docs/DESIGN.md) (sistema de diseño).

Este repo es un proyecto académico de la cátedra Seminario Integrador (Ingeniería en Sistemas de
Información, UTN FRC, 2026).

## Estructura del monorepo

```
/
├── apps/
│   ├── web/               # Next.js + Ant Design (frontend) — responsable: Nico A
│   └── api/                # Node.js + Express + Swagger (backend, placeholder) — responsables: Thiago D'Andrea, Camila Carrizo
├── docs/                   # PRODUCT.md, DESIGN.md, Recursos RentAR (logos, paleta, ejemplos de competencia)
├── packages/
│   ├── shared-types/       # Interfaces TypeScript de dominio compartidas entre web y api
│   └── ui/                 # Tema de Ant Design y componentes propios reutilizables — responsable: Nico A
├── supabase/                # Migraciones y seed de la base de datos — responsable: Ivan Diaz
└── tests/e2e/               # Scripts de Selenium — responsable: Tomás Rosales
```

Cada carpeta vacía o placeholder tiene su propio `README.md` con más detalle.

## Stack y versiones

- Node.js >= 20.9 (ver `.nvmrc`), npm workspaces (sin Turborepo).
- `apps/web`: Next.js 16.3.5 (App Router) + React 19.2.8 + TypeScript + Ant Design 6.6.3
  (`@ant-design/nextjs-registry` para SSR de estilos).
- `apps/api`: Node.js + Express + Swagger (todavía no implementado, ver `apps/api/README.md`).
- `supabase/`: Postgres vía Supabase (todavía sin esquema).
- TypeScript en `strict: true` en todo el monorepo (`tsconfig.base.json`). **Nada de `any`** — si
  algo no se puede tipar bien, usar `unknown` con un comentario que explique por qué.

## Convenciones

- **Idioma:** comentarios en español; nombres de variables, funciones y componentes en inglés.
- **Comentarios:** JSDoc obligatorio arriba de cada componente, hook y utilidad — qué hace, dónde
  se usa y qué props recibe. No comentar lo evidente. Comentar lógica no obvia (filtrado,
  animaciones, `IntersectionObserver`, registro de estilos de antd para SSR).
- **Componentes:** un archivo `Componente.tsx` + `Componente.module.css` cuando el componente
  necesita estilos que los tokens de antd no cubren (layout, spacing). Props siempre tipadas con
  una interfaz explícita (`interface ComponenteProps { ... }`), nunca con `any`.
- **Tokens de diseño:** los componentes de `apps/web` consumen el tema y los colores desde
  `@rentar/ui` (`brand`, `antdTheme`) — nunca un color hardcodeado suelto en un componente. Si
  hace falta un color nuevo, se agrega a `packages/ui/src/theme.ts`, no inline.
- **Alias de import:** `@/*` dentro de `apps/web` (resuelve a `apps/web/src/*`); `@rentar/ui` y
  `@rentar/shared-types` para los paquetes del workspace.

## Regla de datos para la etapa estática

Mientras no exista `apps/api`, las páginas de `apps/web` **nunca importan los mocks
directamente** desde un componente de página — hoy `apps/web/src/lib/data/*` se importa desde
componentes (`Landing`, `SearchBar`, `DesignSystem`) porque el proyecto todavía está en esa etapa.
El próximo paso es introducir `apps/web/src/services/<modulo>.service.ts`: funciones que hoy
devuelven esos mismos mocks y llevan un comentario `TODO(backend): <método y endpoint esperado>`
junto con la User Story (`US-XX`) que cubren. A partir de ese paso, ninguna página o componente de
UI debería importar `lib/data/*` directamente — todo pasa por el service correspondiente.

## `data-testid` para Selenium

Acciones interactivas clave ya llevan `data-testid` para que `tests/e2e/` no dependa de clases CSS
ni de texto visible:

| `data-testid` | Dónde | Acción |
| --- | --- | --- |
| `header-menu-toggle` | Header | Abrir el menú hamburguesa en mobile |
| `header-login-button` | Header | "Iniciar sesión" (placeholder, sin destino) |
| `header-publish-button` | Header | "Publicar propiedad" (placeholder, sin destino) |
| `hero-search-cta` | Hero | CTA primario "Buscar propiedades" |
| `hero-how-it-works-cta` | Hero | CTA secundario "Ver cómo funciona" |
| `search-neighborhood-select` | SearchBar | Filtro de zona |
| `search-type-select` | SearchBar | Filtro de tipología |
| `search-bedrooms-select` | SearchBar | Filtro de dormitorios |
| `search-price-min-input` / `search-price-max-input` | SearchBar | Campos numéricos de precio |
| `search-price-slider` | SearchBar | Slider de rango de precio |
| `search-characteristics-chips` | SearchBar | Chips de características (multi-select) |
| `search-result-count` | SearchBar | Contador de resultados (`role="status"`) |
| `landing-more-properties-button` | Landing | "Buscar más propiedades" (placeholder) |
| `property-card-detail-button` | PropertyCard | "Ver detalle" (placeholder) |

## Estrategia de ramas

- `main`: producción.
- `develop`: integración.
- `feature/<nombre>`: trabajo en curso, ramificada desde `develop`.
- Los PRs siempre van contra `develop`, nunca directo a `main`.

## Comandos

Desde la raíz del monorepo:

```bash
npm install          # instala todo el workspace (raíz + apps + packages)
npm run dev           # levanta apps/web (alias: npm run dev:web)
npm run build         # build de apps/web
npm run lint          # lint de todos los workspaces que tengan script "lint"
npm run typecheck     # tsc --noEmit en todos los workspaces que tengan script "typecheck"
```
