import { Logo } from '@/presentation/components'
import { memo } from 'react'
import styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
