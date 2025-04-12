import { createElement, forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'error'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
}

const variantMap = {
  h1: {
    as: 'h1',
    className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
  },
  h2: {
    as: 'h2',
    className: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'
  },
  h3: {
    as: 'h3',
    className: 'scroll-m-20 text-2xl font-semibold tracking-tight'
  },
  h4: {
    as: 'h4',
    className: 'scroll-m-20 text-xl font-semibold tracking-tight'
  },
  h5: {
    as: 'h5',
    className: 'text-xl font-semibold tracking-wide'
  },
  p: {
    as: 'p',
    className: 'leading-none'
  },
  error: {
    as: 'p',
    className: 'text-danger text-sm mt-1 leading-none'
  }
} as const

export const Text = forwardRef<HTMLElement, TextProps>(({ variant = 'p', className, children, ...props }, ref) => {
  const { as, className: baseClassName } = variantMap[variant]
  const mergedClassName = twMerge(baseClassName, className)

  return createElement(as, { ref, className: mergedClassName, ...props }, children)
})

Text.displayName = 'Text'

export default Text