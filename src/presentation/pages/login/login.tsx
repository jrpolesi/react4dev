import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { useEffect, useState } from 'react'
import styles from './login-styles.scss'

export type LoginStateProps = {
  isLoading: boolean
  email: string
  emailError: string
  passwordError?: string
  mainError?: string
}

export type LoginErrorProps = {}

export type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<LoginStateProps>({
    isLoading: false,
    email: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation?.validate({ email: state.email })
  }, [state.email])

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form action="" className={styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled
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
