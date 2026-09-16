// Entry point exclusivo para el build de /design-sync (Claude Design).
//
// No lo usa apps/web: la app consume @rentar/ui como código TS fuente vía
// `transpilePackages` de Next.js (ver src/index.ts, apuntado por "main" en
// package.json), así que editar un componente sigue teniendo hot-reload
// inmediato sin pasar por ningún build. Este archivo existe solo para que
// el conversor de /design-sync tenga un `dist/` compilado de verdad para
// leer — corre aparte (`npm run build`), nunca en el flujo normal de dev.
//
// Además de re-exportar todo el barrel público, importa css-vars.css a
// propósito: en la app real esas variables las importa apps/web/layout.tsx
// una sola vez; acá hace falta que viajen empaquetadas junto con los
// componentes para que el bundle de Claude Design tenga los tokens
// --rentar-* disponibles.
import './tokens/css-vars.css'

// League Spartan: la app real la carga vía next/font/google (self-hosted
// en el build de Next). Ese mecanismo no existe fuera de Next.js, así que
// acá se resuelve con un @import de Google Fonts en runtime — ver el
// comentario de cabecera de design-sync-fonts.css.
import './design-sync-fonts.css'

export * from './index'
