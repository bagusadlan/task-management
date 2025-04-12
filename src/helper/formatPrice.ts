export function formatPrice(value: number | undefined | null): string {
    if (value == null) {
      return '-'
    }
  
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }
  