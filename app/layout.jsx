import { League_Spartan } from 'next/font/google'
import Script from 'next/script'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { antdTheme } from '@/lib/theme'
import './globals.css'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-league-spartan',
  display: 'swap',
})

export const metadata = {
  title: 'RentAR — Alquilá directo, sin inmobiliaria',
  description:
    'RentAR: alquilá o publicá tu propiedad en Córdoba directamente entre particulares, sin inmobiliaria. Contrato con firma electrónica, ajuste automático por IPC/ICL y pagos trazables.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={leagueSpartan.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
        </AntdRegistry>
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js?token=ff1a1f09-56e1-42ee-92b4-8792e5d0840e"></script>
{/* impeccable-live-end */}
</body>
    </html>
  )
}
