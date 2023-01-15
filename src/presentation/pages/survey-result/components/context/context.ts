import { createContext } from 'react'

type Props = {
  onAnswer: (answer: string) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default createContext<Props>({} as Props)
