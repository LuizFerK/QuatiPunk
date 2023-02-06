import { Poppins } from '@next/font/google'
import { TbMinus, TbPlus } from 'react-icons/tb'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import Button from './button'

import styles from '../styles/components/counter.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface CounterProps {
  icon: IconType
  label?: string
  value: number
  onChange?: (value: string) => void
}

export default function Counter({ icon: Icon, label, value, onChange }: CounterProps) {
  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true
  })

  return (
    <div>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={styles.container}>
        <Icon />
        <Button icon={TbMinus} secondary />
        <input className={poppins.className} value={value} />
        <Button icon={TbPlus} secondary />
      </div>
    </div>
  )
}
