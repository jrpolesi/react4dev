import { FormStatusBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/components/atoms'
import { useRecoilValue } from 'recoil'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(loginState)

  return <FormStatusBase state={state} />
}

export default FormStatus
