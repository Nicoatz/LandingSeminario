import type { ThemeConfig } from 'antd'

/**
 * Paleta de marca de RentAR. Fuente de verdad de todos los colores del sistema
 * (ver docs/DESIGN.md) — ningún componente debería usar un color hardcodeado
 * en su lugar.
 */
export const brand = {
  blue: '#004D98',
  blueDark: '#003B74',
  gold: '#D7B15D',
  goldInk: '#8C6B1D',
  sky: '#A0D1EF',
  skyLight: '#E3F2FB',
  ink: '#12202E',
  paper: '#F7F9FB',
} as const

/**
 * Tema de Ant Design (`ConfigProvider`) construido a partir de `brand`. Se
 * consume desde `apps/web/src/app/layout.tsx` envolviendo toda la app.
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: brand.blue,
    colorPrimaryHover: brand.blueDark,
    colorPrimaryActive: brand.blueDark,
    colorInfo: brand.blue,
    colorLink: brand.blue,
    colorLinkHover: brand.blueDark,
    colorText: brand.ink,
    colorTextSecondary: 'rgba(18, 32, 46, 0.7)',
    colorTextTertiary: 'rgba(18, 32, 46, 0.7)',
    colorBgLayout: brand.paper,
    colorBgContainer: '#ffffff',
    colorBorder: 'rgba(18, 32, 46, 0.10)',
    colorBorderSecondary: 'rgba(18, 32, 46, 0.05)',
    fontFamily: "'League Spartan', system-ui, sans-serif",
    borderRadius: 12,
    fontSize: 16,
  },
  components: {
    Button: {
      borderRadius: 999,
      borderRadiusLG: 999,
      borderRadiusSM: 999,
      controlHeight: 44,
      controlHeightLG: 48,
      paddingInline: 24,
      paddingInlineLG: 24,
      fontWeight: 600,
      primaryShadow: '0 10px 25px -5px rgba(0, 77, 152, 0.35)',
      defaultShadow: 'none',
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary:
        '0 1px 2px 0 rgba(18, 32, 46, 0.05), 0 1px 3px 0 rgba(18, 32, 46, 0.06)',
      paddingLG: 16,
    },
    Input: {
      borderRadius: 8,
      colorBgContainer: brand.paper,
      activeBorderColor: brand.blue,
      hoverBorderColor: brand.blue,
    },
    Select: {
      borderRadius: 8,
      colorBgContainer: brand.paper,
      optionSelectedBg: brand.skyLight,
    },
    Slider: {
      railBg: '#e2e8f0',
      railHoverBg: '#e2e8f0',
      trackBg: brand.blue,
      trackHoverBg: brand.blueDark,
      handleColor: brand.blue,
      handleActiveColor: brand.blue,
      dotActiveBorderColor: brand.blue,
    },
    Drawer: {
      colorBgElevated: '#ffffff',
    },
    Layout: {
      headerBg: 'rgba(247, 249, 251, 0.9)',
      bodyBg: brand.paper,
      footerBg: '#ffffff',
    },
  },
}
