import { FormStatusBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components/atoms'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signUpState)

  return <FormStatusBase state={state} />
}

export default FormStatus
