import type { IconPropTypes } from '@/components/icons/iconPropTypes'
import { iconsDefaultValue as defaultValue } from '@/components/icons/iconPropTypes'

export default function CloseIcon({
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
      <path d='M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z' />
    </svg>
  )
}
