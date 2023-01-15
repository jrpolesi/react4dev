import { FormStatusBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components/atoms'
import { useRecoilValue } from 'recoil'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signUpState)

  return <FormStatusBase state={state} />
}

export default FormStatus
