import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, useState } from 'react'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import styles from '../styles/components/button.module.css'
import Tooltip from './tooltip'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconType
  active?: boolean
  secondary?: boolean
  confirm?: boolean
  label?: string
  labelPosition?: "bottom" | "top" | "bottom-left"
}

export default function Button({ icon: Icon, label, disabled, labelPosition, active, confirm, secondary, onClick, ...rest }: ButtonProps) {
  const [confirmation, setConfirmation] = useState(false)

  const buttonStyle = classNames({
    [styles.container]: true,
    [styles.primary]: !secondary,
    [styles.active]: active,
    [styles.toConfirm]: confirmation,
  })

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    if (!confirm) {
      onClick && onClick(e)
    }
    
    if (confirm && confirmation) {
      onClick && onClick(e)
    } else {
      setConfirmation(true)
    }
  }

  return (
    <button
      className={buttonStyle}
      onClick={handleOnClick}
      disabled={disabled}
      onMouseLeave={() => setConfirmation(false)}
      {...rest}
    >
      {label && !disabled ? (
        <Tooltip labelPosition={labelPosition} label={confirmation ? `Tem certeza que deseja ${label.toLowerCase()}?` : label}>
          <Icon />
        </Tooltip>
      ) : <Icon />}
    </button>
  )
}
