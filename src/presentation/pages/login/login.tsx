import { Authentication } from '@/domain/useCases'
import { Footer, LoginHeader } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import {
  FormStatus,
  Input,
  loginState,
  SubmitButton
} from '@/presentation/pages/login/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormEvent, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
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
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useRecoilState<LoginStateProps>(loginState)
  const navigate = useNavigate()

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation?.validate(field, formData) ?? ''
    }))
    setState((oldState) => ({
      ...oldState,
      isFormInvalid: !!oldState.emailError || !!oldState.passwordError
    }))
  }

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (state.isLoading || state.isFormInvalid) return

    try {
      setState((oldState) => ({ ...oldState, isLoading: true }))

      const account = await authentication?.auth({
        email: state.email,
        password: state.password
      })

      if (account) {
        setCurrentAccount(account)
      }

      navigate('/', { replace: true })
    } catch (error: any) {
      setState((oldState) => ({
        ...oldState,
        mainError: error?.message,
        isLoading: false
      }))
    }
  }

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />

      <form
        data-testid="form"
        className={styles.form}
        onSubmit={(e) => {
          void handleSubmit(e)
        }}
      >
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <SubmitButton text="Entrar" />
        <Link data-testid="signup-link" to="/signup" className={styles.link}>
          Criar conta
        </Link>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
