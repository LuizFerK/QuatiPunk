import { Poppins } from '@next/font/google'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import styles from '../styles/components/payments.module.css'
import Payment from './payment'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface PaymentsProps {
  value: string
  disabled?: boolean
  onChange?: (value: Payment) => void
}

export default function Payments({value, disabled, onChange }: PaymentsProps) {
  const payments: Payment[] = ["card", "cash", "pix"]

  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true,
    [styles.disabled]: disabled
  })

  function handleSelect(payment: Payment) {
    !disabled && onChange && onChange(payment)
  }

  return (
    <div className={styles.wrapper}>
      <label className={labelStyle}>Método de pagamento:</label>
      <div className={styles.container}>
        {payments.map(payment => (
          <button key={payment} type="button" onClick={() => handleSelect(payment)}>
            <Payment type={payment} selectable selected={value === payment} />
          </button>
        ))}
      </div>
    </div>
  )
}
