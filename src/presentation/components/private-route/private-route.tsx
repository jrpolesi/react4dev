import { currentAccountState } from '@/presentation/components/atoms/atoms'
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type Props = {
  component: ReactElement<any, any> | null
}

const PrivateRoute: React.FC<Props> = ({ component }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  const hasToken = getCurrentAccount()?.accessToken

  return hasToken ? component : <Navigate to="/login" />
}

export default PrivateRoute
