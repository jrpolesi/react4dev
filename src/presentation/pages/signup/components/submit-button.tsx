import { SubmitButtonBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components/atoms'
import { useRecoilValue } from 'recoil'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(signUpState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
