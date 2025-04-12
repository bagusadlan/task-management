import type { HTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

type LoadingIconProps = HTMLAttributes<HTMLDivElement> & {}

const LoadingIcon = ({ className, ...props }: LoadingIconProps) => {
  return (
    <div
      className={twMerge(
        'w-4 h-4 box-border border-2 border-solid border-accent border-r-accent-foreground rounded-full animate-spin',
        className
      )}
      {...props}
    />
  )
}

export default LoadingIcon
