import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { useState } from 'react'
import styles from './signup-styles.scss'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state } as any}>
        <form className={styles.form}>
          <h2>Criar Conta</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <button
            data-testid="submit"
            disabled
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <span className={styles.link}>Voltar Para Login</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Signup
