import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  text: string
  state: any
}

const SubmitButtonBase: React.FC<Props> = ({ text, state }: Props) => {
  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
      {text}
    </button>
  )
}

export default SubmitButtonBase
