import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import styles from '../styles/components/button.module.css'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconType
  active?: boolean
  secondary?: boolean
}

export default function Button({ icon: Icon, active, secondary, onClick, ...rest }: ButtonProps) {
  const buttonStyle = classNames({
    [styles.container]: true,
    [styles.primary]: !secondary,
    [styles.active]: active
  })

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onClick && onClick(e)
  }

  return (
    <button className={buttonStyle} onClick={handleOnClick} {...rest}>
      <Icon />
    </button>
  )
}
