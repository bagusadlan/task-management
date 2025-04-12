import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'px-2 md:px-2 max-w-full lg:max-w-screen-lg xl:max-w-[1276px] 2xl:max-w-[1276px] m-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
