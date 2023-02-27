import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getClients } from '../api/clients'

import Search from '../components/search'
import Client from '../components/client'
import Spinner from '../components/spinner'

import styles from '../styles/pages/clientes.module.css'

export default function Clients() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<Search>({default: true} as Search)
  
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])

  useEffect(() => {
    async function fetchClients() {
      const { data } = await getClients()
      setIsLoading(false)
      setClients(data)
    }

    fetchClients()
  }, [])

  useEffect(() => {
    setFilteredClients(clients)

    if (!search.default) {
      search.input && setFilteredClients(allClients => allClients.filter(client => client.name.toLowerCase().includes((search.input as string).toLowerCase())))
      search.order === "asc" && setFilteredClients(allClients => [...allClients].sort((a, b) => (a.name > b.name) ? 1 : -1))
      search.order === "desc" && setFilteredClients(allClients => [...allClients].sort((a, b) => (a.name > b.name) ? -1 : 1))
    }
  }, [clients, search])

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
        <Search placeholder="Nome do cliente..." onChange={opts => setSearch(opts)} />
        <ol>
          {filteredClients.map(client => <Client key={client.cpf} client={client} />)}
        </ol>
      </main>
    </>
  )
}
