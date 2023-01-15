import { SubmitButtonBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components/atoms'
import { useRecoilState } from 'recoil'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(signUpState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
