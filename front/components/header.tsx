import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { TbArrowLeft } from 'react-icons/tb'

import styles from '../styles/components/header.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Header() {
  const { route, back } = useRouter()

  const parsedRouteName = route.slice(1, 2).toUpperCase() + route.slice(2)

  return (
    <header className={styles.header}>
      <button onClick={back}>
        <TbArrowLeft />
      </button>
      <h1 className={poppins.className}>{parsedRouteName}</h1>
    </header>
  )
}
