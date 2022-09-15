import Spinner from '@/presentation/components/spinner/spinner'
import styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>Erro</span>}
    </div>
  )
}

export default FormStatus
