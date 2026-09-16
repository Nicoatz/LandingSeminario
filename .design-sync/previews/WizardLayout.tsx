import { useState } from 'react'
import { WizardLayout } from '@rentar/ui'

const steps = [
  { key: 'datos', title: 'Datos del contrato', content: <p>Paso 1: fechas, propiedad y monto inicial.</p> },
  { key: 'firmantes', title: 'Firmantes', content: <p>Paso 2: datos del locatario y del garante.</p> },
  { key: 'revision', title: 'Revisión', content: <p>Paso 3: confirmar y enviar a firma electrónica.</p> },
]

export const FirstStep = () => {
  const [step, setStep] = useState(0)
  return <WizardLayout steps={steps} currentStep={step} onStepChange={setStep} onFinish={() => setStep(0)} />
}

export const LastStep = () => {
  const [step, setStep] = useState(2)
  return <WizardLayout steps={steps} currentStep={step} onStepChange={setStep} onFinish={() => setStep(0)} />
}
