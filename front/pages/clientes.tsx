import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getClients } from '../api/clients'

import Search from '../components/search'
import Client from '../components/client'
import Spinner from '../components/spinner'

import styles from '../styles/pages/clientes.module.css'

export default function Clients() {
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    async function fetchClients() {
      const { data } = await getClients()
      setIsLoading(false)
      setClients(data)
    }

    fetchClients()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!clients) {
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
        <Search placeholder="Nome do cliente..." />
        <ol>
          {clients.map(client => <Client key={client.id} client={client} />)}
        </ol>
      </main>
    </>
  )
}
