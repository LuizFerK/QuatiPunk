import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getClient, updateClient, deleteClient } from '../../api/clients'
import {
  TbUser,
  TbAddressBook,
  TbArrowRight,
  TbTrash,
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
  const { push } = useRouter()
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Error[]>([])
  const [isFilled, setIsFilled] = useState(false)

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

    await updateClient(client.cpf, client)
  }

  async function handleDelete() {
    try {
      await deleteClient(client.cpf)
      push('/clientes')
    } catch {
      setErrors(lastErrors => [
        {message: "Não foi possível deletar o cliente pois existe uma ou mais vendas atreladas a ele" },
        ...lastErrors
      ] as Error[])
    }
  }

  if (!client) {
    return <></>
  }

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
      <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
        <div className={styles.logo}>
          <TbUser />
        </div>
        <p className={poppins.className}>Formulário de cadastro de cliente:</p>
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map(error => (
              <p className={poppins.className}>{error.message}</p>
            ))}
          </div>
        )}
        <Input
          icon={TbUser}
          label="Nome:"
          placeholder="John Doe"
          disabled={!token}
          value={client.name}
          onChange={e => setClient({ ...client, name: e.target.value })}
        />
        <Input
          icon={TbAddressBook}
          label="CPF:"
          placeholder="12345678900"
          disabled={true}
          value={client.cpf}
          onChange={e => setClient({ ...client, cpf: e.target.value })}
        />
        <Input
          icon={TbPhone}
          label="Telefone:"
          placeholder="(99) 99999-9999"
          type="number"
          disabled={!token}
          value={client.phone}
          onChange={e => setClient({ ...client, phone: e.target.value })}
        />
        <Input
          icon={TbMapPin}
          label="Endereço:"
          placeholder="Rua João Luiz, Apto 301"
          disabled={!token}
          value={client.address}
          onChange={e => setClient({ ...client, address: e.target.value })}
        />
        <Input
          icon={TbMail}
          label="Email:"
          placeholder="Digite o email..."
          type="email"
          disabled={!token}
          value={client.mail}
          onChange={e => setClient({ ...client, mail: e.target.value })}
        />
        {token ? (
          <div>
            <Button label="Deletar o cliente" icon={TbTrash} secondary confirm onClick={handleDelete} />
            <Button label="Atualizar o cliente" disabled={!isFilled} confirm icon={TbArrowRight} />
          </div>
        ) : <div />}
      </form>
    </>
  )
}
