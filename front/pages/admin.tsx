import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { TbKey, TbLock, TbArrowRight } from 'react-icons/tb'

import Input from '../components/input'
import Button from '../components/button'

import styles from '../styles/pages/admin.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Admin() {
  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.logo}>
          <TbKey />
        </div>
        <p className={poppins.className}>
          Você está entrando no <span>modo administrador</span>. Neste modo você terá acesso para alterar e excluir registros do sistema.
        </p>
        <p className={poppins.className}>
          Para entrar, por favor, digite a senha de acesso:
        </p>
        <Input icon={TbLock} placeholder="Digite sua senha..." width={490} type="password" />
        <Button icon={TbArrowRight} />
      </main>
    </>
  )
}
