import { HTMLAttributes } from 'react'
import styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => (
  <div
    {...props}
    data-testid="spinner"
    className={[styles.spinner, props.className].join(' ')}
  >
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Spinner
