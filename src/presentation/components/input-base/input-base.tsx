import { LoginErrorProps } from '@/presentation/pages/login/login'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './input-base-styles.scss'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  state: any
  setState: any
}

const InputBase: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const error = state[`${props.name}Error` as keyof LoginErrorProps]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        id={props.name}
        {...props}
        title={error || null}
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
      <label
        data-testid={`${props.name}-label`}
        htmlFor={props.id ?? props.name}
        title={error || null}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default InputBase
