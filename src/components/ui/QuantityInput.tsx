import type { ChangeEvent, FC } from 'react'

import Input from './Input'
import Button from './Button'
import Stack from './Stack'
import { AddIcon, RemoveIcon } from '@/components/icons'

interface QuantityInputProps {
  value?: number
  min?: number
  max: number
  onChange?: (quantity: number) => void
  className?: string
}

const QuantityInput: FC<QuantityInputProps> = ({ value = 1, min = 1, max, onChange = () => {}, className = '' }) => {
  const handleIncrease = (): void => {
    if (value < max) {
      const newValue = value + 1

      onChange(newValue)
    }
  }

  const handleDecrease = (): void => {
    if (value > min) {
      const newValue = value - 1

      onChange(newValue)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || min
    const newValue = Math.min(Math.max(value, min), max)

    onChange(newValue)
  }

  return (
    <Stack direction='row' spacing={0} className={`items-center rounded-lg ${className}`}>
      <Button
        size='sm'
        className='rounded-r-none border-r-0'
        icon={<RemoveIcon />}
        variant='outlined'
        onClick={handleDecrease}
        disabled={value <= min}
      />
      <Input
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className='w-12 text-center focus:outline-none focus:ring-0 rounded-none p-1.5 h-8'
        aria-label='Product quantity'
      />

      <Button
        size='sm'
        className='rounded-l-none border-l-0'
        icon={<AddIcon />}
        variant='outlined'
        onClick={handleIncrease}
        disabled={value >= max}
      />
    </Stack>
  )
}

export default QuantityInput
