import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/components/atoms'
import { useRecoilValue } from 'recoil'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
