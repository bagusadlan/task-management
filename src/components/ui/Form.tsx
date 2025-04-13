import type { FormHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type FormProps = FormHTMLAttributes<HTMLFormElement> & {}

const Form = forwardRef<HTMLFormElement, FormProps>(({ ...props }, ref) => {
  return <form ref={ref} {...props} />
})

Form.displayName = 'Form'

export default Form
