import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10
  wrap?: boolean
}

const spacingClasses = (direction: string, spacing: StackProps['spacing'] = 0) => {
  const spacingMap: { [key in NonNullable<StackProps['spacing']>]: string } = {
    0: '',
    1: direction.includes('row') ? 'gap-x-1' : 'gap-y-1',
    2: direction.includes('row') ? 'gap-x-2' : 'gap-y-2',
    3: direction.includes('row') ? 'gap-x-3' : 'gap-y-3',
    4: direction.includes('row') ? 'gap-x-4' : 'gap-y-4',
    5: direction.includes('row') ? 'gap-x-5' : 'gap-y-5',
    6: direction.includes('row') ? 'gap-x-6' : 'gap-y-6',
    8: direction.includes('row') ? 'gap-x-8' : 'gap-y-8',
    10: direction.includes('row') ? 'gap-x-10' : 'gap-y-10'
  }

  return spacingMap[spacing]
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, direction = 'column', spacing = 4, wrap = false, className, ...props }, ref) => {
    const baseClass = 'flex'

    const directionClass = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse'
    }[direction]

    const spacingClass = spacingClasses(direction, spacing)
    const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap'

    const mergedClassName = twMerge(baseClass, directionClass, spacingClass, wrapClass, className)

    return (
      <div ref={ref} className={mergedClassName} {...props}>
        {children}
      </div>
    )
  }
)

export default Stack
