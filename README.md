# RentAR

Monorepo de RentAR — plataforma para gestionar alquileres residenciales de larga duración
directamente entre locador, locatario y garante, sin inmobiliaria. Piloto en Córdoba, Argentina.
Proyecto académico de Seminario Integrador (Ingeniería en Sistemas de Información, UTN FRC, 2026).

## Requisitos

- Node.js >= 20.9 (usar la versión de `.nvmrc`: `nvm use`, si tenés `nvm` instalado).
- npm (viene con Node). El monorepo usa **npm workspaces**, no hace falta instalar pnpm ni
  Turborepo.

## Instalar y correr

```bash
git clone <url-del-repo>
cd LandingSeminario
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). `npm run dev` levanta `apps/web` (la landing);
es un alias de `npm run dev:web`.

Otros comandos útiles desde la raíz:

```bash
npm run build       # build de producción de apps/web
npm run lint         # ESLint en todos los workspaces
npm run typecheck    # chequeo de tipos (tsc --noEmit) en todos los workspaces
```

## Qué hay en cada carpeta

| Carpeta | Qué es | Preguntarle a |
| --- | --- | --- |
| `apps/web` | Landing en Next.js + Ant Design + TypeScript | Nico A |
| `apps/api` | Backend Node.js + Express + Swagger (placeholder, todavía no implementado) | Thiago D'Andrea, Camila Carrizo |
| `packages/ui` | Tema de Ant Design (`@rentar/ui`) y futuros componentes propios reutilizables | Nico A |
| `packages/shared-types` | Interfaces TypeScript de dominio compartidas entre `apps/web` y `apps/api` | Nico A / Thiago D'Andrea |
| `docs/` | `PRODUCT.md`, `DESIGN.md` y recursos de marca/competencia | Nico A |
| `supabase/` | Migraciones y seed de la base de datos | Ivan Diaz |
| `tests/e2e/` | Scripts de Selenium | Tomás Rosales |

Para convenciones de código, estrategia de ramas y más detalle de arquitectura, ver
[`CLAUDE.md`](CLAUDE.md).
