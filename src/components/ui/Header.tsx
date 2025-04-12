import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

const Header = forwardRef<HTMLHeadElement, HTMLAttributes<HTMLHeadElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <header ref={ref} className={twMerge(className)} {...props}>
        {children}
      </header>
    )
  }
)

Header.displayName = 'Header'

export default Header
