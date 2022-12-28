import { SurveyContext } from '@/presentation/pages/survey-list/components'
import { useContext } from 'react'
import styles from './error-styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
