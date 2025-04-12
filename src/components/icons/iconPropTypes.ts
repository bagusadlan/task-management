import type { SVGProps } from 'react'

export type IconPropTypes = SVGProps<SVGSVGElement> & {
  height?: string
  width?: string
  color?: string
}

export const iconsDefaultValue = {
  height: '24px',
  width: '24px',
  currentColor: 'currentColor'
}
