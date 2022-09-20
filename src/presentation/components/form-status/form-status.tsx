import Spinner from '@/presentation/components/spinner/spinner'
import styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && <span className={styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
