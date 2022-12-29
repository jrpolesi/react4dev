import { AddAccount } from '@/domain/useCases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './signup-styles.scss'

export type Props = {
  validation?: Validation
  addAccount?: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

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

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation?.validate(field, formData) ?? ''
    }))
    setState((oldState) => ({
      ...oldState,
      isFormInvalid:
        !!oldState.nameError ||
        !!oldState.emailError ||
        !!oldState.passwordError ||
        !!oldState.passwordConfirmationError
    }))
  }

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(
    () => validate('passwordConfirmation'),
    [state.passwordConfirmation]
  )

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

      if (account) {
        setCurrentAccount(account)
      }

      navigate('/', { replace: true })
    } catch (error: any) {
      setState({ ...state, isLoading: false, mainError: error?.message })
    }
  }

  return (
    <div className={styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState } as any}>
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
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Signup
