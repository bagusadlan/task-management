import type { ReactNode, ForwardedRef, LabelHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref: ForwardedRef<HTMLLabelElement>) => (
    <label
      ref={ref}
      className={twMerge(
        'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        required && 'before:content-["*"] before:text-danger before:mr-1',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
)

Label.displayName = 'Label'

export default Label
