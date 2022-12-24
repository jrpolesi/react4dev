import { FormContext } from '@/presentation/contexts'
import { DetailedHTMLProps, InputHTMLAttributes, useContext } from 'react'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
      {text}
    </button>
  )
}

export default SubmitButton
