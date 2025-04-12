import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number
  gap?: number
}

const Grid = forwardRef<HTMLDivElement, GridProps>(({ columns = 2, gap = 2, className, children, ...rest }, ref) => {
  let columnClass = ''
  let gapClass = ''

  switch (columns) {
    case 0:
      columnClass = 'grid-cols-0'
      break
    case 1:
      columnClass = 'grid-cols-1'
      break
    case 2:
      columnClass = 'grid-cols-2'
      break
    case 3:
      columnClass = 'grid-cols-3'
      break
    case 4:
      columnClass = 'grid-cols-4'
      break
    case 5:
      columnClass = 'grid-cols-5'
      break
    case 6:
      columnClass = 'grid-cols-6'
      break
    case 7:
      columnClass = 'grid-cols-7'
      break
    case 8:
      columnClass = 'grid-cols-8'
      break
    case 9:
      columnClass = 'grid-cols-9'
      break
    case 10:
      columnClass = 'grid-cols-10'
      break
    default:
      columnClass = 'grid-cols-1'
  }

  switch (gap) {
    case 0:
      gapClass = 'gap-0'
      break
    case 1:
      gapClass = 'gap-1'
      break
    case 2:
      gapClass = 'gap-2'
      break
    case 3:
      gapClass = 'gap-3'
      break
    case 4:
      gapClass = 'gap-4'
      break
    case 5:
      gapClass = 'gap-5'
      break
    case 6:
      gapClass = 'gap-6'
      break
    case 7:
      gapClass = 'gap-7'
      break
    case 8:
      gapClass = 'gap-8'
      break
    case 9:
      gapClass = 'gap-9'
      break
    case 10:
      gapClass = 'gap-10'
      break
    default:
      gapClass = 'gap-2'
  }

  const gridClass = twMerge(`grid ${columnClass} ${gapClass}`, className)

  return (
    <div ref={ref} className={gridClass} {...rest}>
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export default Grid
