import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'

import styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form action="" className={styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={styles.submit} type="submit">
          Entrar
        </button>

        <span className={styles.link}>Criar conta</span>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
