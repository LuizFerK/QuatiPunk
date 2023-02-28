import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { createClient } from '../../api/clients'
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

import styles from '../../styles/pages/cliente.module.css'
import NoAccess from '../../components/noAccess'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function ClientDetails() {
  const { token } = useAuth()
  const { push } = useRouter()

  const [errors, setErrors] = useState<Error[]>([])
  const [isFilled, setIsFilled] = useState(false)

  const [client, setClient] = useState<Client>({} as Client)

  useEffect(() => {
    // validade formats
    if (
      !!client.name &&
      !!client.cpf &&
      !!client.phone &&
      !!client.address
    ) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [client])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors([])

    if (client.cpf && client.cpf.length != 11) {
      setErrors(lastErrors => [{ field: "cpf", message: "CPF deve ter 11 caracteres" }, ...lastErrors] as Error[])
    }

    if (client.phone && (client.phone.length != 11)) {
      setErrors(lastErrors => [{ field: "phone", message: "Telefone deve ter 11 caracteres" }, ...lastErrors] as Error[])
    }

    if (client.cpf && client.cpf.length != 11 || client.phone && (client.phone.length != 11)) return
  
    const { data } = await createClient(client)
    push(`/cliente/${data.cpf}`)
  }

  if (!token) {
    return <NoAccess />
  }

  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
        <div className={styles.logo}>
          <TbUser />
        </div>
        <p className={poppins.className}>Formulário de cadastro de cliente:</p>
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map(error => (
              <p key={error.field} className={poppins.className}>{error.message}</p>
            ))}
          </div>
        )}
        <Input
          icon={TbUser}
          label="Nome:"
          placeholder="John Doe"
          value={client.name}
          onChange={e => setClient({ ...client, name: e.target.value })}
        />
        <Input
          icon={TbAddressBook}
          label="CPF:"
          placeholder="12345678900"
          type="number"
          value={client.cpf}
          onChange={e => setClient({ ...client, cpf: e.target.value })}
        />
        <Input
          icon={TbPhone}
          label="Telefone:"
          placeholder="(99) 99999-9999"
          type="number"
          value={client.phone}
          onChange={e => setClient({ ...client, phone: e.target.value })}
        />
        <Input
          icon={TbMapPin}
          label="Endereço:"
          placeholder="Rua João Luiz, Apto 301"
          value={client.address}
          onChange={e => setClient({ ...client, address: e.target.value })}
        />
        <Input
          icon={TbMail}
          label="Email:"
          placeholder="Digite o email..."
          type="email"
          value={client.mail}
          onChange={e => setClient({ ...client, mail: e.target.value })}
        />
        <div>
          <Button label="Criar cliente" disabled={!isFilled} icon={TbArrowRight} />
        </div>
      </form>
    </>
  )
}
