import Link from 'next/link'
import { Poppins } from '@next/font/google'
import { TbKey } from 'react-icons/tb'
import styles from '../styles/components/noAccess.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function NoAccess() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <TbKey />
      </div>
      <p className={poppins.className}>
        Esta área do sistema é exclusiva para o <span>modo administrador</span>.
      </p>
      <p className={poppins.className}>
        Para entrar, por favor, <Link href="/admin"><b>clique aqui</b></Link>.
      </p>
    </div>
  )
}