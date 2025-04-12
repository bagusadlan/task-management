import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

type DividerProps = {
  direction?: 'horizontal' | 'vertical'
  thickness?: string
  length?: string
  color?: string
  className?: string
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ direction = 'horizontal', thickness = '1px', length = '100%', color = 'bg-gray-300', className }, ref) => {
    const baseStyles = direction === 'horizontal' ? `w-[${length}] h-[1px]` : `w-${thickness} h-[${length}]`

    return <div ref={ref} className={twMerge(`${baseStyles} ${color}`, className)} />
  }
)

export default Divider
