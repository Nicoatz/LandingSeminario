import { MoneyAmount } from '@rentar/ui'

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
    <MoneyAmount amount={580000} size="sm" />
    <MoneyAmount amount={580000} size="md" />
    <MoneyAmount amount={580000} size="lg" />
  </div>
)

export const Emphasis = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
    <MoneyAmount amount={580000} size="md" />
    <MoneyAmount amount={580000} size="md" emphasis />
    <MoneyAmount amount={1250000} size="lg" emphasis />
  </div>
)
