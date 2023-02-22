import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { TbArrowLeft, TbPlus } from 'react-icons/tb'

import Button from './button'

import styles from '../styles/components/header.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Header() {
  const { route, back, push } = useRouter()

  const parsedRouteName = route.slice(1, 2).toUpperCase() + route.slice(2)
  const routeName = parsedRouteName.replace("/[id]", "")

  function handleCreate() {
    push(parsedRouteName.replace('s', '').toLowerCase())
  }

  return (
    <header className={styles.header}>
      <Button icon={TbArrowLeft} secondary onClick={back} />
      <h1 className={poppins.className}>{routeName}</h1>
      <Button icon={TbPlus} onClick={handleCreate} />
    </header>
  )
}
