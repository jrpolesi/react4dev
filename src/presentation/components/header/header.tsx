import Logo from '@/presentation/components/logo/logo'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'
import { memo, useContext } from 'react'
import styles from './header-styles.scss'

const Header: React.FC = () => {
  const logout = useLogout()

  const { getCurrentAccount } = useContext(ApiContext)

  const buttonClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />

        <div className={styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount?.().name}</span>
          <a data-testid="logout" href="#" onClick={buttonClick}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
