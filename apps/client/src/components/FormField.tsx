import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLLabelElement> {
  label: ReactNode
  isRequired?: boolean
  description?: ReactNode
  hint?: ReactNode
}

export const FormField = forwardRef<HTMLLabelElement, FormFieldProps>(
  (props, ref) => {
    const {
      children,
      label,
      isRequired = false,
      description,
      hint,
      ...rest
    } = props

    return (
      <label {...rest} ref={ref}>
        <FormFieldLabel isAstrixShown={isRequired}>{label}</FormFieldLabel>
        {description ? (
          <FormFieldDescription>{description}</FormFieldDescription>
        ) : null}
        <div className="mt-2">{children}</div>
        {hint ? <FormFieldHint>{hint}</FormFieldHint> : null}
      </label>
    )
  }
)

export const FormFieldDescription = forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <p className="my-2 text-sm text-slate-500" ref={ref}>
      {props.children}
    </p>
  )
})

export const FormFieldHint = forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <p className="mt-1 text-sm text-slate-500" ref={ref}>
      {props.children}
    </p>
  )
})

interface FormFieldLabelProps extends InputHTMLAttributes<HTMLDivElement> {
  isAstrixShown: boolean
}

export const FormFieldLabel = forwardRef<HTMLDivElement, FormFieldLabelProps>(
  (props, ref) => {
    return (
      <div className="block text-sm font-medium leading-6 text-slate-900">
        {props.children}
        {props.isAstrixShown ? (
          <>
            {' '}
            <span title="This field is required.">*</span>
          </>
        ) : null}
      </div>
    )
  }
)
