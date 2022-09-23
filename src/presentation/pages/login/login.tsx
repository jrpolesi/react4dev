import { Authentication } from '@/domain/useCases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { FormEvent, useEffect, useState } from 'react'
import styles from './login-styles.scss'

export type LoginStateProps = {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

export type LoginErrorProps = {}

export type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState<LoginStateProps>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', state.email) ?? '',
      passwordError: validation?.validate('password', state.password) ?? ''
    })
  }, [state.email, state.password])

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (state.isLoading || state.emailError || state.passwordError) return

    setState({ ...state, isLoading: true })

    async function authenticate(): Promise<void> {
      try {
        await authentication?.auth({
          email: state.email,
          password: state.password
        })
      } catch (error: any) {
        setState({ ...state, mainError: error?.message })
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    }

    void authenticate()
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <span className={styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
