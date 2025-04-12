import type { IconPropTypes } from '@/components/icons/iconPropTypes'
import { iconsDefaultValue as defaultValue } from '@/components/icons/iconPropTypes'

export default function RemoveIcon({
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
      <path d='M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z' />
    </svg>
  )
}
