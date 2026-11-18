const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return `৳${numberFormatter.format(value)}`
}

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}
