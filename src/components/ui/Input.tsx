import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import Text from './Text'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
  leftAddon?: ReactNode
  leftAddonClassName?: string
  rightAddon?: ReactNode
  rightAddonClassName?: string
  wrapperClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      leftAddon,
      leftAddonClassName,
      rightAddon,
      rightAddonClassName,
      wrapperClassName,
      error,
      placeholder,
      className,
      disabled,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <div className={twMerge('relative w-full', wrapperClassName)}>
          {leftAddon && (
            <span
              className={twMerge(
                'absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground pointer-events-none',
                disabled && 'opacity-50',
                leftAddonClassName
              )}
            >
              {leftAddon}
            </span>
          )}
          <input
            type={type}
            className={twMerge(
              `flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary`,
              leftAddon ? 'pl-9' : '',
              rightAddon ? 'pr-9' : '',
              disabled ? 'opacity-50 cursor-not-allowed' : '',
              className
            )}
            disabled={disabled}
            placeholder={placeholder ?? 'Input text'}
            ref={ref}
            {...props}
          />
          {rightAddon && (
            <span
              className={twMerge(
                'absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground pointer-events-none',
                disabled && 'opacity-50',
                rightAddonClassName
              )}
            >
              {rightAddon}
            </span>
          )}
        </div>
        {error && <Text>{error}</Text>}
      </>
    )
  }
)

Input.displayName = 'Input'

export default Input
