import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getOrders } from '../api/orders'

import Order from '../components/order'
import Search from '../components/search'
import Spinner from '../components/spinner'

import styles from '../styles/pages/vendas.module.css'

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<Search>({default: true} as Search)
  
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await getOrders()
      setIsLoading(false)
      setOrders(data)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    setFilteredOrders(orders)

    console.log(search.client)

    if (!search.default) {
      search.input && setFilteredOrders(allOrders => allOrders.filter(order => String(order.id) === search.input))
      search.client && setFilteredOrders(allOrders => allOrders.filter(order => order.client.name === search.client))
      search.category && setFilteredOrders(allOrders => allOrders.filter(order => order.products.some(product => product.category === search.category)))
      search.order === "asc" && setFilteredOrders(allOrders => [...allOrders].sort((a, b) => (a.id > b.id) ? 1 : -1))
      search.order === "desc" && setFilteredOrders(allOrders => [...allOrders].sort((a, b) => (a.id > b.id) ? -1 : 1))
    }
  }, [orders, search])

  if (isLoading) {
    return <Spinner />
  }

  if (!orders) {
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
        <Search placeholder="Código da venda..." onChange={opts => setSearch(opts)} clients categories />
        <section className={styles.content}>
          <ol>
            {filteredOrders.filter(order => order.id % 2 == 1).map(order => <Order key={order.id} order={order} />)}
          </ol>
          <ol>
            {filteredOrders.filter(order => order.id % 2 == 0).map(order => <Order key={order.id} order={order} />)}
          </ol>
        </section>
      </main>
    </>
  )
}
