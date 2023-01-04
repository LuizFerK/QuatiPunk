import Head from 'next/head'
import { useQuery } from 'react-query'
import { getProducts } from '../api/products'

import Search from '../components/search'
import Product from '../components/product'
import Spinner from '../components/spinner'

import styles from '../styles/pages/produtos.module.css'

export default function Produtos() {
  const { isLoading, isError, data: products } = useQuery('products', getProducts)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !products) {
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
        <Search placeholder="Nome do produto..." categories />
        <ul>
          {products.map(product => <Product key={product.id} product={product} />)}
        </ul>
      </main>
    </>
  )
}
