import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getProducts } from '../api/products'

import Search from '../components/search'
import Product from '../components/product'
import Spinner from '../components/spinner'

import styles from '../styles/pages/produtos.module.css'

export default function Produtos() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await getProducts()
      setIsLoading(false)
      setProducts(data)
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!products) {
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
        <ol>
          {products.map(product => <Product key={product.id} product={product} />)}
        </ol>
      </main>
    </>
  )
}
