# Convenciones de @rentar/ui

- **Paleta**: azul institucional (`#004D98`) es el único color "fuerte" para lo interactivo
  (botones primarios, links, foco). El dorado (`#D7B15D` / texto `#8C6B1D`) está reservado
  exclusivamente a dinero/valor — `MoneyAmount`, la línea de precio — nunca a un estado de
  `StatusTag`, por más "positivo" que sea. El celeste (`#A0D1EF` / `#E3F2FB`) es atmósfera:
  fondos, hover, dividers — nunca texto ni íconos.
- **Tipografía**: League Spartan en todo el sistema, sin una segunda familia. Pesos 400–800.
- **Radios**: `rounded-full` (pill, `9999px`) en todo botón, badge, chip y `StatusTag`. Contenedores
  usan `md` (`1rem`) o `lg` (`1.5rem`) — nunca esquinas rectas ni un radio intermedio distinto de
  esos tres pasos.
- **`StatusTag`** resuelve label, color e ícono por dominio + estado vía `getStatusMeta` — ningún
  componente de pantalla elige esos tres valores "a mano".
- Todo componente que necesite el tema de marca (`ConfigProvider` con `antdTheme`/`antdThemeDark`)
  fuera de `apps/web` debe envolverse en `ThemeProvider` (`@rentar/ui`) — es lo que aplica esta
  librería importada de forma aislada, ya que `apps/web/layout.tsx` arma su propio `ConfigProvider`
  a mano por ser Server Component.
- Componentes con `position: fixed` (`RoleSwitcher`) o que rendrizan vía portal
  (`ConfirmActionModal`, y los paneles de `NotificationBell`/`UserMenu`) tienen limitaciones
  conocidas en previews estáticas aisladas — ver `.design-sync/NOTES.md`. El comportamiento real
  del componente (fuera de esta captura) es correcto.
