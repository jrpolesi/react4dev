import Logo from '@/presentation/components/logo/logo'
import { ApiContext } from '@/presentation/contexts'
import { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './header-styles.scss'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)

  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault()
    setCurrentAccount?.(undefined)
    navigate('/login')
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />

        <div className={styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount?.().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
