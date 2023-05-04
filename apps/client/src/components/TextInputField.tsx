import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { FormField } from './FormField'
import { TextInput } from './TextInput'

interface TextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  isRequired?: boolean
  description?: ReactNode
  hint?: ReactNode
  isInvalid?: boolean
  dataTestId?: string
}

export const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  (props, ref) => {
    const { label, isRequired, description, hint, ...rest } = props

    return (
      <FormField
        label={label}
        isRequired={isRequired}
        description={description}
        hint={hint}
      >
        <TextInput required={isRequired} {...rest} ref={ref} />
      </FormField>
    )
  }
)
