import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/ui'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, placeholder, className, disabled, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <>
        <textarea
          className={twMerge(
            `flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary`,
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            className
          )}
          disabled={disabled}
          placeholder={placeholder ?? 'Input text'}
          ref={ref}
          {...props}
        />
        {error && <Text variant='error'>{error}</Text>}
      </>
    )
  }
)
Textarea.displayName = 'Textarea'

export default Textarea
