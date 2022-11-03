import { Authentication, SaveAccessToken } from '@/domain/useCases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login-styles.scss'

export type LoginStateProps = {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
  isFormInvalid: boolean
}

export type LoginErrorProps = {}

export type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const [state, setState] = useState<LoginStateProps>({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const emailError = validation?.validate('email', state.email) ?? ''
    const passwordError = validation?.validate('password', state.password) ?? ''

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (state.isLoading || state.isFormInvalid) return

    try {
      setState({ ...state, isLoading: true })

      const account = await authentication?.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account?.accessToken ?? '')
      navigate('/', { replace: true })
    } catch (error: any) {
      setState({ ...state, mainError: error?.message, isLoading: false })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
