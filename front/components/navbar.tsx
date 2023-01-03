import { Poppins } from '@next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  TbReportMoney,
  TbReportAnalytics,
  TbCircleSquare,
  TbUsers,
  TbKey
} from 'react-icons/tb'

import styles from '../styles/components/navbar.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function NavBar() {
  const { route } = useRouter()
  
  const [isHover, setIsHover] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isHover) {
        setIsOpen(true)
      }
    }, 500)

    return () => {
      setIsOpen(false)
      clearTimeout(timeout)
    }
  }, [isHover])

  const navStyle = classNames({
    [styles.nav]: true,
    [styles.navExtended]: isOpen
  })

  const liStyle = (liRoute: string) => classNames({
    [styles.li]: true,
    [styles.liExtended]: isOpen,
    [styles.selected]: liRoute == route
  })

  const admStyle = classNames({
    [styles.ul]: true,
    [styles.adm]: true
  })

  return (
    <nav
      className={navStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={styles.logo} />
      <ul className={styles.ul}>
        <li className={liStyle("/vendas")}>
          <Link href="/vendas">
            <TbReportMoney />
            <span className={poppins.className}>Vendas</span>
          </Link>
        </li>
        <li className={liStyle("/analises")}>
          <Link href="/analises">
            <TbReportAnalytics width={20} height={20} />
            <span className={poppins.className}>Análises</span>
          </Link>
        </li>
        <li className={liStyle("/produtos")}>
          <Link href="/produtos">
            <TbCircleSquare />
            <span className={poppins.className}>Produtos</span>
          </Link>
        </li>
        <li className={liStyle("/clientes")}>
          <Link href="/clientes">
            <TbUsers />
            <span className={poppins.className}>Clientes</span>
          </Link>
        </li>
      </ul>
      <ul className={admStyle}>
        <li className={liStyle("/admin")}>
          <Link href="/admin">
            <TbKey />
            <span className={poppins.className}>Admin</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
