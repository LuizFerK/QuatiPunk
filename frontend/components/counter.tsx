import { Poppins } from '@next/font/google'
import { TbMinus, TbPlus, TbTrash } from 'react-icons/tb'
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
  disabled?: boolean
  removable?: boolean
  onRemove?: () => void
  onChange?: (value: number) => void
}

export default function Counter({ icon: Icon, label, value, noBackground, disabled, removable, onRemove, onChange }: CounterProps) {
  const containerStyle = classNames({
    [styles.container]: true,
    [styles.noBackground]: noBackground,
    [styles.disabled]: disabled
  })

  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true
  })

  function handleInput(newValue: string) {
    onChange && onChange(Number(newValue))
  }

  function handleMinus() {
    if (removable && onRemove && value === 1) {
      return onRemove()
    }

    if (onChange && value > 0) {
      return onChange(value - 1)
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
        {!disabled && <Button type="button" icon={removable && value === 1 ? TbTrash : TbMinus} secondary onClick={handleMinus} />}
        <input
          className={poppins.className}
          disabled={disabled}
          value={value}
          type="number"
          onChange={e => handleInput(e.target.value)}
        />
        {!disabled ? <Button type="button" icon={TbPlus} secondary onClick={handlePlus} /> : <div />}
      </div>
    </div>
  )
}
