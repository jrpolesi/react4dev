import Context from '@/presentation/contexts/form/form-context'
import { DetailedHTMLProps, InputHTMLAttributes, useContext } from 'react'
import styles from './input-styles.scss'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)

  return (
    <button
      data-testid="submit"
      disabled={state.isFormInvalid}
      className={styles.submit}
      type="submit"
    >
      {text}
    </button>
  )
}

export default SubmitButton
