import Head from 'next/head'
import { useQuery } from 'react-query'
import { getOrders } from '../api/orders'

import Order from '../components/order'
import Search from '../components/search'
import Spinner from '../components/spinner'

import styles from '../styles/pages/vendas.module.css'

export default function Orders() {
  const { isLoading, isError, data: orders } = useQuery('orders', getOrders)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !orders) {
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
