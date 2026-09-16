# Notas de /design-sync — RentAR

## Gotchas del repo

- **No hay Storybook.** Se usa el flujo `package` (`non-storybook/SKILL.md`), directo contra
  `packages/ui`.
- **`packages/ui` no tenía build propio.** apps/web consume el paquete como fuente TS directa vía
  `transpilePackages` de Next.js (sin build), así que hubo que agregar un build exclusivo para
  /design-sync: `npm run build` en `packages/ui` usa **tsup**, con entry point dedicado
  `src/design-sync-entry.ts` (no `src/index.ts` — ese sigue siendo el `main` que consume apps/web).
  `cfg.buildCmd` apunta a `npm run build --workspace=@rentar/ui`; el `--entry` del conversor es
  `./packages/ui/dist/index.mjs` (no `dist/index.es.js`, el nombre por defecto del skill).
- **`next/image` y `next/link` rompían el bundle entero.** `Header`, `Footer`, `AuthLayout` y
  `AppShell` los usaban. Como el conversor NO externaliza `next` (solo `react`/`react-dom`/
  `react-is`), `next/image` terminaba inlineado en el IIFE — y su código interno referencia
  `process.env.NEXT_RUNTIME` / `process.platform`, que no existen en un navegador sin el runtime
  de Next.js. Eso tiraba `ReferenceError: process is not defined` al cargar `_ds_bundle.js`,
  rompiendo los 24 componentes (no solo esos 4), porque todas las previews cargan el mismo bundle.
  **Fix (con el visto bueno del usuario, ver decisión abajo):** se reemplazó `next/image` por
  `<img>` y `next/link` por `<a>` en esos 4 componentes, en `packages/ui` — afecta también a
  apps/web (packages/ui es la fuente real que consume), verificado con build + typecheck +
  inspección del HTML generado (el `src` real, no `[object Object]`). Cambio de comportamiento
  aceptado: se pierde la navegación client-side de `Link` hacia `/design-system` (pasa a recarga
  completa) y el `priority`/lazy-loading fino de `next/image` en esas imágenes puntuales — la
  salida visual es idéntica (`next/image` con import estático ya renderiza un `<img>` por debajo).
- **`*.svg` cambia de forma según el pipeline.** En apps/web (loader de imágenes de Next.js),
  `import logo from './logo.svg'` da un objeto `StaticImageData` (`{ src, height, width, ... }`).
  Tsup no tiene ese loader — se agregó un plugin de esbuild en `packages/ui/tsup.config.ts`
  (`svgAsStaticImageData`) que emite `export default { src: "data:image/svg+xml;base64,..." }`,
  para que `logo.src` funcione igual en los dos pipelines. Los componentes consumen siempre
  `logo.src`, nunca `logo` a secas.
- **League Spartan no viaja con next/font.** apps/web la carga con `next/font/google`
  (self-hosted en el build de Next, sin archivos accesibles desde afuera). Se agregó
  `packages/ui/src/design-sync-fonts.css` con un `@import` a Google Fonts, importado solo desde
  `design-sync-entry.ts` (nunca desde `apps/web`, que sigue usando `next/font`). El validador lo
  reporta como `[FONT_REMOTE]` — informativo, sin acción necesaria.
- **`ThemeProvider` nuevo, exclusivo para host aislados.** `packages/ui/src/components/
  ThemeProvider.tsx` envuelve `ConfigProvider` con `antdTheme`/`antdThemeDark` + `antdLocale`.
  apps/web arma esto a mano en `layout.tsx` (Server Component, no puede usar el barrel completo).
  `ThemeProvider` es lo que usa `cfg.provider` en `.design-sync/config.json` para que las previews
  aisladas de Claude Design rendericen con el tema de marca en vez del tema default de antd.
- **Chromium para el render check:** hubo que instalar `chromium` (build `v1194`, el que pide el
  playwright-core instalado en `.ds-sync/node_modules`) con `npx playwright install chromium`
  desde `.ds-sync/` — el cache existente en `%LOCALAPPDATA%\ms-playwright` tenía otras revisiones
  (1217/1234/1243) que no coincidían.

## Bug encontrado y corregido: CSS Modules no generaba el mapeo de clases

`esbuild-css-modules-plugin` (el paquete que se había elegido inicialmente para el build de tsup)
compilaba el CSS pero devolvía **`{}` vacío** como export default para los 24 componentes —
`styles.header`, `styles.menuButton`, etc. daban todos `undefined`, así que ningún className
custom se aplicaba (solo sobrevivía el styling que pone `antdTheme` vía JS, no el de los
`.module.css`). Encima, sin scoping, clases con el mismo nombre en archivos distintos (ej.
`.header` en `Header.module.css`, `AppShell.module.css` y `PageHeader.module.css`) se pisaban
entre sí en el CSS final — la última definición ganaba para TODOS los usos. Esto pasó
desapercibido en el primer par de builds porque antd aporta suficiente estilo propio para que la
mayoría de las tarjetas "se vean bien" a primera vista; se detectó recién mirando de cerca la
hoja de contacto de `AppShell` (el header con la campanita y el avatar quedaba superpuesto con el
contenido).

**Fix:** se sacó `esbuild-css-modules-plugin` y se usa el soporte nativo de CSS Modules de esbuild
(`loader: 'local-css'`, disponible desde esbuild 0.19). Tiene que declararse en la opción
`loader` de **tsup** (no en `esbuildOptions`) porque tsup arma su propio plugin interno de CSS con
`cssLoader: loader['.css']` ANTES de correr `esbuildOptions` — pasarlo por ahí no tiene efecto
(confirmado a mano). Verificado después del fix: cada `*_default` en `dist/index.mjs` tiene ahora
las clases reales, escopeadas por archivo (`AppShell_header`, `Header_header`, sin colisión), y
`css-vars.css`/`design-sync-fonts.css` (que no tienen ninguna clase) no cambiaron.

## Known render warns (triaged como legítimos)

- `[RENDER_THIN]` en `ConfirmActionModal`: el `Modal` de antd rendriza vía un portal a
  `document.body`, fuera del `<div id="root">` medido — el root queda en 0px de alto aunque el
  modal se vea perfecto (confirmado a ojo en `_screenshots/feedback__ConfirmActionModal.png`:
  paleta, radios pill y texto correctos). Benigno, no requiere cambios.
- `[RENDER_BLANK]` en `RoleSwitcher`: `position: fixed; right: 1rem; bottom: 1rem` (por diseño —
  ver `RoleSwitcher.module.css` y la nota de Fase 2 en `apps/web/src/components/DesignSystem.tsx`,
  que por el mismo motivo usa un `<Segmented>` de antd en vez del `RoleSwitcher` real para su demo
  en `/design-system`). Un elemento `fixed` se posiciona contra el viewport real de la página, no
  contra el frame acotado de la tarjeta — no hay `cardMode`/`viewport` que lo traiga de vuelta al
  cuadro sin reimplementar el componente (prohibido por el skill). Queda igual que
  `ConfirmActionModal`: la funcionalidad real del componente es correcta, la limitación es de la
  captura estática aislada.

## Alcance de previews

El usuario eligió autoría completa: los 24 componentes exportados por `@rentar/ui` tienen preview
autoral en `.design-sync/previews/`, ninguno quedó en floor card. Las previews se armaron a partir
de los usos reales en `apps/web/src/components/DesignSystem.tsx` (fuente primaria: es literalmente
el catálogo en vivo del design system).

`NotificationBell` y `UserMenu` solo muestran el trigger cerrado (campanita/avatar) — el panel
desplegable es `Dropdown` de antd con `trigger: ['click']`, estado interno no controlable por
props desde afuera. Igual que un hover, es un estado no capturable estáticamente sin reimplementar
el componente (prohibido por el skill) — se documenta acá en vez de forzarlo.

## Re-sync risks

- Si `Header`/`Footer`/`AuthLayout`/`AppShell` vuelven a importar algo de `next/*` en el futuro
  (por ejemplo alguien reintroduce `next/image` "porque optimiza"), el bundle entero se rompe otra
  vez de la misma forma silenciosa — no hay lint que lo prevenga hoy (`packages/ui` no tiene su
  propio script de lint, gap conocido desde la fase de design system). Vale la pena chequear esto
  a mano en cada re-sync hasta que se agregue lint a `packages/ui`.
- Las previews de `NotificationBell`/`UserMenu` solo cubren el estado cerrado — si se agrega un
  prop `defaultOpen` (u otra forma de forzar el panel abierto) más adelante, conviene ampliar la
  preview.
- El `@import` de Google Fonts en `design-sync-fonts.css` depende de que Google Fonts esté
  accesible en runtime para quien vea el design system importado — es el mismo supuesto que
  cualquier DS que resuelve tipografía por `[FONT_REMOTE]`, documentado acá por las dudas.
