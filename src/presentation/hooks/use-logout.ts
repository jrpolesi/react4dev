import { ApiContext } from '@/presentation/contexts'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

type CallBackType = () => void
type ResultType = CallBackType

export const useLogout = (): ResultType => {
  const navigate = useNavigate()

  const { setCurrentAccount } = useContext(ApiContext)

  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login')
  }
}
