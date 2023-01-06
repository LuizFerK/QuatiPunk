import { InputHTMLAttributes, DetailedHTMLProps } from 'react'
import { Poppins } from '@next/font/google'
import { IconType } from 'react-icons'
import classNames from 'classnames'

import styles from '../styles/components/input.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  icon: IconType
  placeholder: string
  label?: string
  width?: number | string
}

export default function Input({ icon: Icon, placeholder, label, width, ...rest }: InputProps) {
  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true
  })

  return (
    <>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={styles.container} style={{ width: width || "100%" }}>
        <Icon />
        <input className={poppins.className} placeholder={placeholder} {...rest} />
      </div>
    </>
  )
}
