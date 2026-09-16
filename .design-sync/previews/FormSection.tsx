import { useState } from 'react'
import { FileDropzone, FormSection, MoneyInput } from '@rentar/ui'

export const Default = () => {
  const [value, setValue] = useState(450000)
  return (
    <FormSection title="Datos de la propiedad" description="Información básica que ve el locatario en la publicación.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <MoneyInput value={value} onChange={setValue} />
        <FileDropzone hint="JPG o PNG, hasta 5 fotos." />
      </div>
    </FormSection>
  )
}
