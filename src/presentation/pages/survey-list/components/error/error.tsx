import { SurveyContext } from '@/presentation/pages/survey-list/components'
import { useContext } from 'react'
import styles from './error-styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState((oldState) => ({
      surveys: [],
      error: '',
      reload: !oldState.reload
    }))
  }

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}

export default Error
