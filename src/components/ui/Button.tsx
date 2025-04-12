import type { ButtonHTMLAttributes, Ref, ReactNode } from 'react'
import { forwardRef } from 'react'

import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

import { LoadingIcon } from '@/components/icons'
import type { ColorTypes, SizeTypes } from '@/components/ui/uiPropTypes'

type ButtonVariant = 'default' | 'outlined' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: LinkProps
  text?: string
  color?: ColorTypes
  size?: SizeTypes
  variant?: ButtonVariant
  icon?: ReactNode
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asLink,
      color,
      size,
      text,
      icon,
      variant = 'default',
      loading = false,
      className,
      disabled,
      style,
      children,
      ...props
    },
    ref
  ) => {
    let buttonClasses = ''
    let sizeClass = ''

    switch (size) {
      case 'xs':
        sizeClass = `h-6 rounded-md px-2 text-xs ${loading && icon && text ? 'px-4' : ''}`
        break
      case 'sm':
        sizeClass = `h-8 rounded-md px-3 text-xs ${loading && icon && text ? 'px-5' : ''}`
        break
      case 'lg':
        sizeClass = `h-10 rounded-md px-8 ${loading && icon && text ? 'px-10' : ''}`
        break
      case 'md':
      default:
        sizeClass = `h-9 px-4 py-2 ${loading && icon && text ? 'px-5' : ''}`
        break
    }

    switch (variant) {
      case 'outlined':
        switch (color) {
          case 'secondary':
            buttonClasses =
              'border border-secondary bg-secondary shadow-sm hover:bg-secondary text-accent-foreground/50'
            break
          case 'success':
            buttonClasses = 'border border-success bg-background shadow-sm hover:bg-accent text-success'
            break
          case 'caution':
            buttonClasses = 'border border-caution bg-background shadow-sm hover:bg-accent text-caution'
            break
          case 'warning':
            buttonClasses = 'border border-warning bg-background shadow-sm hover:bg-accent text-warning'
            break
          case 'danger':
            buttonClasses = 'border border-danger bg-background shadow-sm hover:bg-accent text-danger'
            break
          case 'info':
            buttonClasses = 'border border-info bg-background shadow-sm hover:bg-accent text-info'
            break
          case 'primary':
            buttonClasses = 'border border-primary bg-background shadow-sm hover:bg-accent text-primary '
            break
          default:
            buttonClasses = 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
            break
        }

        break
      case 'ghost':
        buttonClasses = 'hover:bg-accent hover:text-accent-foreground'
        break
      case 'default':
      default:
        switch (color) {
          case 'secondary':
            buttonClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow'
            break
          case 'success':
            buttonClasses = 'bg-success text-success-foreground hover:bg-success/90 shadow'
            break
          case 'caution':
            buttonClasses = 'bg-caution text-caution-foreground hover:bg-caution/90 shadow'
            break
          case 'warning':
            buttonClasses = 'bg-warning text-warning-foreground hover:bg-warning/90 shadow'
            break
          case 'danger':
            buttonClasses = 'bg-danger text-danger-foreground hover:bg-danger/90 shadow'
            break
          case 'info':
            buttonClasses = 'bg-info text-info-foreground hover:bg-info/90 shadow'
            break
          case 'accent':
            buttonClasses = 'bg-accent text-accent-foreground hover:bg-accent/90 shadow'
            break
          case 'primary':
          default:
            buttonClasses = 'bg-primary text-primary-foreground hover:bg-primary/90 shadow'
            break
        }

        break
    }

    const baseClass = twMerge(
      'relative inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 justify-center transition-all duration-500 w-auto cursor-pointer',
      sizeClass && sizeClass,
      buttonClasses && buttonClasses,
      `${!text || !icon || loading ? '' : 'gap-2'}`,
      loading && 'cursor-not-allowed',
      loading && icon && text && 'cursor-not-allowed',
      className
    )

    if (asLink) {
      return (
        <Link
          className={baseClass}
          aria-disabled={disabled || loading}
          ref={ref as Ref<HTMLAnchorElement>}
          style={style}
          {...asLink}
        >
          {children ?? (
            <>
              {icon && <span className={loading ? 'opacity-0' : ''}>{icon}</span>}
              {text && <span className={loading ? 'opacity-0' : ''}>{text}</span>}
              {loading && (
                <span className='absolute inset-0 flex items-center justify-center'>
                  {loading && <LoadingIcon />}
                  {loading && <span className='sr-only'>Loading...</span>}
                </span>
              )}
            </>
          )}
        </Link>
      )
    }

    return (
      <button
        type='button'
        className={baseClass}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        style={style}
        {...props}
      >
        {children ?? (
          <>
            {icon && <span className={loading ? 'opacity-0' : ''}>{icon}</span>}
            {text && <span className={twMerge(loading && 'opacity-0', icon && 'leading-none mb-0.5')}>{text}</span>}
            {loading && (
              <span className='absolute inset-0 flex items-center justify-center'>
                {loading && <LoadingIcon />}
                {loading && <span className='sr-only'>Loading...</span>}
              </span>
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
