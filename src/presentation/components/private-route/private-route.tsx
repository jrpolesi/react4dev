import { ApiContext } from '@/presentation/contexts'
import { ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  component: ReactElement<any, any> | null
}

const PrivateRoute: React.FC<Props> = ({ component }: Props) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const hasToken = getCurrentAccount()?.accessToken

  return hasToken ? component : <Navigate to="/login" />
}

export default PrivateRoute
