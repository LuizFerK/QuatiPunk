import { Poppins } from '@next/font/google'
import { IconType } from 'react-icons'

import styles from '../styles/components/input.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface InputProps {
  icon: IconType
  placeholder: string
}

export default function Input({ icon: Icon, placeholder }: InputProps) {
  return (
    <div className={styles.container}>
      <Icon />
      <input className={poppins.className} placeholder={placeholder} />
    </div>
  )
}
