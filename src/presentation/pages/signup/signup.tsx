import { AddAccount, SaveAccessToken } from '@/domain/useCases'
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
import styles from './signup-styles.scss'

export type Props = {
  validation?: Validation
  addAccount?: AddAccount
  saveAccessToken?: SaveAccessToken
}

const Signup: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    const nameError = validation?.validate('name', formData) ?? ''
    const emailError = validation?.validate('email', formData) ?? ''
    const passwordError = validation?.validate('password', formData) ?? ''
    const passwordConfirmationError =
      validation?.validate('passwordConfirmation', formData) ?? ''

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await addAccount?.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      if (account) await saveAccessToken?.save(account.accessToken)
      navigate('/', { replace: true })
    } catch (error: any) {
      setState({ ...state, isLoading: false, mainError: error?.message })
    }
  }

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState } as any}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
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

          <SubmitButton text="Cadastrar" />

          <Link to="/login" data-testid="login-link" className={styles.link}>
            Voltar Para Login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Signup
