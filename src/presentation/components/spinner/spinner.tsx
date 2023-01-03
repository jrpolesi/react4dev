import { HTMLAttributes } from 'react'
import styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? styles.negative : ''

  return (
    <div
      {...props}
      data-testid="spinner"
      className={[styles.spinner, props.className, negativeClass].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
