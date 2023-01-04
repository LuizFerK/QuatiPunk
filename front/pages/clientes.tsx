import Head from 'next/head'
import { useQuery } from 'react-query'
import { getClients } from '../api/clients'

import Search from '../components/search'
import Client from '../components/client'
import Spinner from '../components/spinner'

import styles from '../styles/pages/clientes.module.css'

export default function Clients() {
  const { isLoading, isError, data: clients } = useQuery('clients', getClients)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !clients) {
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
        <ul>
          {clients.map(client => <Client key={client.id} client={client} />)}
        </ul>
      </main>
    </>
  )
}
