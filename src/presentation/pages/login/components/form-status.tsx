import { FormStatusBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/components/atoms'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(loginState)

  return <FormStatusBase state={state} />
}

export default FormStatus
