import { InputHTMLAttributes, DetailedHTMLProps } from 'react'
import { Poppins } from '@next/font/google'
import { IconType } from 'react-icons'

import styles from '../styles/components/input.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  icon: IconType
  placeholder: string
  width?: number | string
}

export default function Input({ icon: Icon, placeholder, width, ...rest }: InputProps) {
  return (
    <div className={styles.container} style={{ width: width || "100%" }}>
      <Icon />
      <input className={poppins.className} placeholder={placeholder} {...rest} />
    </div>
  )
}
