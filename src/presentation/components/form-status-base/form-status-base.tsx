import { Spinner } from '@/presentation/components'
import styles from './form-status-base-styles.scss'

type Props = {
  state: any
}

const FormStatusBase: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={styles.error}>
          {mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatusBase
