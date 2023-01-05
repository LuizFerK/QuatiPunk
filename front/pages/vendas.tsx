import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getOrders } from '../api/orders'

import Order from '../components/order'
import Search from '../components/search'
import Spinner from '../components/spinner'

import styles from '../styles/pages/vendas.module.css'

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await getOrders()
      setIsLoading(false)
      setOrders(data)
    }

    fetchOrders()
  }, [])

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
        <Search placeholder="Código da venda..." clients categories />
        <section className={styles.content}>
          <ol>
            {orders.filter(order => order.id % 2 == 1).map(order => <Order key={order.id} order={order} />)}
          </ol>
          <ol>
            {orders.filter(order => order.id % 2 == 0).map(order => <Order key={order.id} order={order} />)}
          </ol>
        </section>
      </main>
    </>
  )
}
