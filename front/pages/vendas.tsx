import Head from 'next/head'
import Search from '../components/search'

import styles from '../styles/pages/vendas.module.css'

export default function Orders() {
  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Search placeholder="Nome do produto..." clients categories />
      </main>
    </>
  )
}
