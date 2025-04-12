export function formatStringOfDate(date: string, options?: Intl.DateTimeFormatOptions, replaceString: boolean = true) {
  const dateOption: Intl.DateTimeFormatOptions = {
    year: options?.year || 'numeric',
    month: options?.month || 'long',
    day: options?.day || 'numeric',
    ...options
  }

  const formattedDate = new Date(date).toLocaleDateString('id-ID', dateOption)

  return replaceString ? formattedDate.replace(' pukul', ' -').replace('.', ':') : formattedDate
}

export const formatTime = (date: Date | null) => {
  if (date) {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  return '00:00'
}

export const formatDateTime = (date: Date | null, time: string | null): string => {
  if (!date) return ''

  if (!time) {
    date.setHours(0, 0, 0, 0)
  } else {
    const [hours, minutes] = time.split(':').map(Number)

    date.setHours(hours, minutes)
  }

  return date.toISOString().split('.')[0] + 'Z'
}
