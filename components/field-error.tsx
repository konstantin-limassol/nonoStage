type FieldErrorProps = {
  message?: string
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null
  }

  return <p className="m-0 text-xs leading-4 text-destructive">{message}</p>
}
