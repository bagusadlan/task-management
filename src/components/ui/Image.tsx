import type { ImgHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const Image = forwardRef<HTMLImageElement, ImageProps>(({ className, loading = 'lazy', ...props }, ref) => {
  return <img ref={ref} className={twMerge('object-cover', className)} loading={loading} {...props} />
})

Image.displayName = 'Image'

export default Image
