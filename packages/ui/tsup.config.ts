import { readFile } from 'node:fs/promises'
import { defineConfig } from 'tsup'
import type { Plugin as EsbuildPlugin } from 'esbuild'

/**
 * Los `*.svg` se tipan como `StaticImageData` (`{ src: string, ... }`, ver
 * src/types/images.d.ts) porque es lo que produce el loader de imágenes de
 * Next.js en apps/web. Fuera de Next (este build) no existe ese loader, así
 * que hay que emular la misma forma a mano: un objeto `{ src }` con el SVG
 * como data URL, no un string suelto — si no, `logo.src` (como lo consumen
 * Header/Footer/AuthLayout/AppShell) sería `undefined` en este bundle.
 */
const svgAsStaticImageData: EsbuildPlugin = {
  name: 'svg-as-static-image-data',
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const raw = await readFile(args.path)
      const dataUrl = `data:image/svg+xml;base64,${raw.toString('base64')}`
      return { contents: `export default { src: ${JSON.stringify(dataUrl)} };`, loader: 'js' }
    })
  },
}

/**
 * Build exclusivo para /design-sync (Claude Design) — no lo usa apps/web,
 * que sigue consumiendo el código fuente directo vía `transpilePackages`
 * de Next.js. Ver el comentario de cabecera de `src/design-sync-entry.ts`.
 */
export default defineConfig({
  entry: { index: 'src/design-sync-entry.ts' },
  format: ['esm'],
  // tsconfig.build.json silencia un warning de baseUrl que tira la versión
  // de TypeScript que usa el paso de dts de tsup (no lo pusimos en
  // tsconfig.json normal para no tocar el typecheck del resto del monorepo).
  tsconfig: 'tsconfig.build.json',
  dts: true,
  bundle: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'antd', '@ant-design/icons', 'dayjs', '@rentar/shared-types'],
  esbuildPlugins: [svgAsStaticImageData],
  // CSS Modules nativo de esbuild (loader 'local-css', desde 0.19) en vez de
  // esbuild-css-modules-plugin: con ese paquete, `styles.header` daba SIEMPRE
  // `{}` vacío (0 clases mapeadas) para los 24 componentes, y el CSS
  // terminaba sin scope — todos los `.module.css` que repiten un nombre de
  // clase (ej. `.header` en Header/AppShell/PageHeader) se pisaban entre sí
  // en el bundle final. Tiene que ir en `loader` (opción de tsup, no de
  // esbuild directo) porque tsup arma su propio plugin de CSS con
  // `cssLoader: loader['.css']` ANTES de que `esbuildOptions` se ejecute —
  // pasarlo por ahí llega tarde y no tiene efecto (confirmado a mano).
  // Se aplica a `.css` en general, no solo a `.module.css`: los otros dos
  // archivos CSS del paquete (css-vars.css, design-sync-fonts.css) no tienen
  // ninguna clase, así que el scoping de CSS Modules no les cambia nada.
  loader: {
    '.css': 'local-css',
  },
})
