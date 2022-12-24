import { Authentication, UpdateCurrentAccount } from '@/domain/useCases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
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
  UpdateCurrentAccount: UpdateCurrentAccount
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  UpdateCurrentAccount
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
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation?.validate('email', formData) ?? ''
    const passwordError = validation?.validate('password', formData) ?? ''

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
      if (account) {
        await UpdateCurrentAccount.save(account)
      }
      navigate('/', { replace: true })
    } catch (error: any) {
      setState({ ...state, mainError: error?.message, isLoading: false })
    }
  }

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
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
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
