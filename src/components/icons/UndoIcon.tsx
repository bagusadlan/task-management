import type { IconPropTypes } from '@/components/icons/iconPropTypes'
import { iconsDefaultValue as defaultValue } from '@/components/icons/iconPropTypes'

export default function UndoIcon({
  height = defaultValue.height,
  width = defaultValue.width,
  color = defaultValue.currentColor,
  ...props
}: IconPropTypes) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      height={height}
      width={width}
      fill={color}
      {...props}
    >
      <path d='M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z' />
    </svg>
  )
}
