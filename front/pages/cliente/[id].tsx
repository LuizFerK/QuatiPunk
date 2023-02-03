import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getClient } from '../../api/clients'
import {
  TbUser,
  TbAddressBook,
  TbArrowRight,
  TbPhone,
  TbMapPin,
  TbMail
} from 'react-icons/tb'

import Input from '../../components/input'
import Button from '../../components/button'
import Spinner from '../../components/spinner'

import styles from '../../styles/pages/cliente.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function ClientDetails() {
  const { id } = useRouter().query
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [mail, setMail] = useState("")

  const [client, setClient] = useState<Client>({} as Client)

  useEffect(() => {
    async function fetchClient() {
      const { data } = await getClient(id as string)
      setIsLoading(false)
      setClient(data)
    }

    id && fetchClient()
  }, [id])

  useEffect(() => {
    // validade formats
    if (!!name && !!cpf && !!phone && !!address && !!mail) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [name, cpf, phone, address, mail])

  if (isLoading) {
    return <Spinner />
  }

  if (!client) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.logo}>
          <TbUser />
        </div>
        <p className={poppins.className}>Formulário de cadastro de cliente:</p>
        {/* <p className={poppins.className}>
          {isErrored ? "Senha incorreta, tente novamente." : "Para entrar, por favor, digite a senha de acesso:"}
        </p> */}
        <Input
          icon={TbUser}
          label="Nome:"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          icon={TbAddressBook}
          label="CPF:"
          placeholder="12345678900"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        />
        <Input
          icon={TbPhone}
          label="Telefone:"
          placeholder="(99) 99999-9999"
          type="number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Input
          icon={TbMapPin}
          label="Endereço:"
          placeholder="Rua João Luiz, Apto 301"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <Input
          icon={TbMail}
          label="Email:"
          placeholder="john@doe.com"
          type="email"
          value={mail}
          onChange={e => setMail(e.target.value)}
        />
        <Button disabled={!isFilled} icon={TbArrowRight} onClick={() => {}} />
      </main>
    </>
  )
}
