import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/ui'

export type CardProps = HTMLAttributes<HTMLDivElement> & {}

interface CardComponent extends ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      `rounded-xl bg-card shadow-sm text-card-foreground px-4 py-6 sm:px-6 transition-all duration-500`,
      className
    )}
    {...props}
  >
    {children}
  </div>
)) as CardComponent

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  row?: boolean
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(`flex flex-col gap-1.5 pb-6`, className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({ ...props }, ref) => (
  <Text ref={ref} variant='h4' {...props} />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={twMerge(`text-sm text-muted-foreground`, className)} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(`flex items-center pt-6`, className)} {...props} />
))

CardFooter.displayName = 'CardFooter'

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
