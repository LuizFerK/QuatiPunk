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
  noBackground?: boolean
  onChange?: (value: number) => void
}

export default function Counter({ icon: Icon, label, value, noBackground, onChange }: CounterProps) {
  const containerStyle = classNames({
    [styles.container]: true,
    [styles.noBackground]: noBackground
  })

  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true
  })

  function handleInput(newValue: string) {
    onChange && onChange(Number(newValue))
  }

  function handleMinus() {
    if (onChange && value > 0) {
      onChange(value - 1)
    }
  }

  function handlePlus() {
    onChange && onChange(value + 1)
  }

  return (
    <div>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={containerStyle}>
        <Icon />
        <Button type="button" icon={TbMinus} secondary onClick={handleMinus} />
        <input
          className={poppins.className}
          value={value}
          type="number"
          onChange={e => handleInput(e.target.value)}
        />
        <Button type="button" icon={TbPlus} secondary onClick={handlePlus} />
      </div>
    </div>
  )
}
