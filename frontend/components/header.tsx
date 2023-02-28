import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { TbArrowLeft, TbPlus } from 'react-icons/tb'

import Button from './button'

import styles from '../styles/components/header.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Header() {
  const { route, back, push } = useRouter()

  const createLabel = route.slice(1, 2) + route.slice(2).replace("s", "")

  const parsedRouteName = route.slice(1, 2).toUpperCase() + route.slice(2)
  const routeName = () => {
    const name = parsedRouteName.replace("/[id]", "")
    
    if (name === "Analises") return "Análises"
    return name
  }

  function renderCreateButton() {
    if (routeName() === "Análises") return false
    if (routeName() === "Admin") return false
    return true
  }

  function handleCreate() {
    push("/" + routeName().replace('s', '').toLowerCase())
  }

  return (
    <header className={styles.header}>
      <Button
        label="Voltar"
        labelPosition="bottom"
        icon={TbArrowLeft}
        secondary
        onClick={back}
      />
      <h1 className={poppins.className}>{routeName()}</h1>
      {renderCreateButton() && (
        <Button
          label={`Adicionar ${createLabel}`}
          labelPosition="bottom-left"
          icon={TbPlus}
          onClick={handleCreate}
        />
      )}
    </header>
  )
}
