import Spinner from '@/presentation/components/spinner/spinner'
import styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  )
}

export default FormStatus
