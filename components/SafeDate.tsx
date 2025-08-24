import { format, parseISO } from 'date-fns'

export default function SafeDate({ iso }: { iso?: string }) {
  if (!iso) return null
  const d = parseISO(iso)
  return <time dateTime={iso}>{isNaN(+d) ? iso : format(d, 'MMM d, yyyy')}</time>
}

