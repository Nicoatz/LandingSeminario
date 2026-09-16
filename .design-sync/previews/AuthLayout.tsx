import { Button, Input } from 'antd'
import { AuthLayout } from '@rentar/ui'

export const Login = () => (
  <AuthLayout title="Iniciar sesión" subtitle="Accedé a tu cuenta de RentAR" compact>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input placeholder="Email" />
      <Input.Password placeholder="Contraseña" />
      <Button type="primary" block>
        Ingresar
      </Button>
    </div>
  </AuthLayout>
)

export const Register = () => (
  <AuthLayout title="Crear cuenta" subtitle="Publicá tu primera propiedad en minutos" compact>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input placeholder="Nombre completo" />
      <Input placeholder="Email" />
      <Input.Password placeholder="Contraseña" />
      <Button type="primary" block>
        Crear cuenta
      </Button>
    </div>
  </AuthLayout>
)
