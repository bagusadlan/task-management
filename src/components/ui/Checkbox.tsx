import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {}

/**
 * A reusable checkbox component.
 *
 * @prop {string} props.className - Optional additional classes to apply to the checkbox.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      type='checkbox'
      className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:accent-primary data-[state=checked]:text-primary-foreground${
        className ? ' ' + className : ''
      }`}
      ref={ref}
      {...props}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
