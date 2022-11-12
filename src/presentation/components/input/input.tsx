import Context from '@/presentation/contexts/form/form-context'
import { LoginErrorProps } from '@/presentation/pages/login/login'
import { DetailedHTMLProps, InputHTMLAttributes, useContext } from 'react'
import styles from './input-styles.scss'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
}

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error` as keyof LoginErrorProps]

  return (
    <div className={styles.inputWrap}>
      <input
        id={props.name}
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={(event) => (event.target.readOnly = false)}
        onChange={(event) =>
          setState({
            ...state,
            [event.target.name]: event.target.value
          })
        }
      />
      <label htmlFor={props.id ?? props.name}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
