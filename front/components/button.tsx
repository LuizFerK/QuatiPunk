import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import styles from '../styles/components/button.module.css'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconType
  active?: boolean
  secondary?: boolean
}

export default function Button({ icon: Icon, active, secondary, ...rest }: ButtonProps) {
  const buttonStyle = classNames({
    [styles.container]: true,
    [styles.primary]: !secondary,
    [styles.active]: active
  })

  return (
    <button className={buttonStyle} {...rest}>
      <Icon />
    </button>
  )
}
