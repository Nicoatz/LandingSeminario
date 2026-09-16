import { defineConfig } from 'tsup'
// @ts-expect-error -- el paquete no trae tipos ESM-friendly, ver su propio index.d.ts (export = ...)
import CssModulesPlugin from 'esbuild-css-modules-plugin'

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
  external: [
    'react',
    'react-dom',
    'antd',
    '@ant-design/icons',
    'next',
    'next/image',
    'next/link',
    'dayjs',
    '@rentar/shared-types',
  ],
  esbuildOptions(options) {
    // Los logos se importan como *.svg en Header/Footer/AuthLayout/AppShell;
    // acá (fuera de Next.js) no hay loader de imágenes, así que se embeben
    // como data URL — next/image acepta un string como src igual que un
    // StaticImageData.
    options.loader = { ...options.loader, '.svg': 'dataurl' }
  },
  esbuildPlugins: [
    CssModulesPlugin({
      inject: false,
      localsConvention: 'camelCaseOnly',
    }),
  ],
})
