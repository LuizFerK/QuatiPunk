import { useState } from 'react'
import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useAuth } from '../hooks/useAuth'
import { TbKey, TbLock, TbArrowRight, TbLogout } from 'react-icons/tb'

import Input from '../components/input'
import Button from '../components/button'

import styles from '../styles/pages/admin.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Admin() {
  const { token, signIn, signOut } = useAuth()

  const [password, setPassword] = useState("")
  const [isErrored, setIsErrored] = useState(false)
  const [isAuth, setIsAuth] = useState(!!token)

  async function handleSignIn() {
    setIsErrored(false)
    const { status } = await signIn(password)

    status == 'error' ? setIsErrored(true) : setIsAuth(true)
  }

  function handleSignOut() {
    setPassword("")
    signOut()
    setIsAuth(false)
  }

  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        {!isAuth ? (
          <>
            <div className={styles.logo}>
              <TbKey />
            </div>
            <p className={poppins.className}>
              Você está entrando no <span>modo administrador</span>. Neste modo você terá acesso para alterar e excluir registros do sistema.
            </p>
            <p className={poppins.className}>
              {isErrored ? "Senha incorreta, tente novamente." : "Para entrar, por favor, digite a senha de acesso:"}
            </p>
            <Input
              icon={TbLock}
              placeholder="Digite sua senha..."
              width={490}
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button disabled={password == ""} icon={TbArrowRight} onClick={handleSignIn} />
          </>
        ) : (
          <>
            <div className={styles.logo}>
              <TbKey />
            </div>
            <p className={poppins.className}>
              Você está no <span>modo administrador</span>.
            </p>
            <p className={poppins.className}>
              Deseja sair desse modo?
            </p>
            <Button icon={TbLogout} onClick={handleSignOut} />
          </>
        )}
      </main>
    </>
  )
}
