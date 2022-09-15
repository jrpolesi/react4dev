import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { useState } from 'react'
import styles from './login-styles.scss'

export type LoginStateProps = {
  isLoading: boolean
}

export type LoginErrorProps = {
  main: string
  email?: string
  password?: string
}

const Login: React.FC = () => {
  const [state] = useState<LoginStateProps>({
    isLoading: false
  })

  const [errorState] = useState<LoginErrorProps>({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
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
