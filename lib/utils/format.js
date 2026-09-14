const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatMonthlyPrice(amount) {
  return `${currencyFormatter.format(amount)} /mes`
}
