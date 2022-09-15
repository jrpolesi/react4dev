import Context from '@/presentation/contexts/form/form-context'
import { LoginErrorProps } from '@/presentation/pages/login/login'
import {
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  useContext
} from 'react'
import styles from './input-styles.scss'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
}

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name as keyof LoginErrorProps]

  const enableInput = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string | undefined => {
    return error
  }

  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
