import { Poppins } from '@next/font/google'
import { TbForbid2, TbMinus, TbPlus, TbTrash } from 'react-icons/tb'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import Button from './button'

import styles from '../styles/components/counter.module.css'
import Tooltip from './tooltip'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface CounterProps {
  icon: IconType
  label?: string
  tooltip?: string
  value: number
  maxQuantity?: number
  noBackground?: boolean
  disabled?: boolean
  removable?: boolean
  onRemove?: () => void
  onChange?: (value: number) => void
}

export default function Counter({
  icon: Icon,
  label,
  tooltip,
  value,
  maxQuantity,
  noBackground,
  disabled,
  removable,
  onRemove,
  onChange
}: CounterProps) {
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
    if (maxQuantity && Number(newValue) > maxQuantity) return

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
    if (maxQuantity && value + 1 > maxQuantity) return

    onChange && onChange(value + 1)
  }

  return (
    <div>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={containerStyle}>
        {tooltip ? (
          <Tooltip label={tooltip}>
            <Icon />
          </Tooltip>
        ) : <Icon />}
        {!disabled && (
          <Button
            label="Diminuir"
            type="button"
            icon={removable && value === 1 ? TbTrash : TbMinus}
            secondary
            onClick={handleMinus}
          />
        )}
        <input
          className={poppins.className}
          disabled={disabled}
          value={value}
          type="number"
          onChange={e => handleInput(e.target.value)}
        />
        {!disabled ? (
          <Button
            label="Aumentar"
            type="button"
            disabled={maxQuantity && value + 1 > maxQuantity || false}
            icon={maxQuantity && value + 1 > maxQuantity ? TbForbid2 : TbPlus}
            onClick={handlePlus}
            secondary
          />
        ) : <div />}
      </div>
    </div>
  )
}
