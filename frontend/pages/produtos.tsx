import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getProducts } from '../api/products'

import Search from '../components/search'
import Product from '../components/product'
import Spinner from '../components/spinner'

import styles from '../styles/pages/produtos.module.css'

export default function Produtos() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<Search>({default: true} as Search)
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await getProducts()
      setIsLoading(false)
      setProducts(data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    setFilteredProducts(products)

    if (!search.default) {
      search.input && setFilteredProducts(allProducts => allProducts.filter(product => product.name.toLowerCase().includes((search.input as string).toLowerCase())))
      search.category && setFilteredProducts(allProducts => allProducts.filter(product => product.category === search.category))
      search.order === "asc" && setFilteredProducts(allProducts => [...allProducts].sort((a, b) => (a.id > b.id) ? 1 : -1))
      search.order === "desc" && setFilteredProducts(allProducts => [...allProducts].sort((a, b) => (a.id > b.id) ? -1 : 1))
    }
  }, [products, search])

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
        <Search placeholder="Nome do produto..." categories onChange={opts => setSearch(opts)} />
        <ol>
          {filteredProducts.map(product => <Product key={product.id} product={product} />)}
        </ol>
      </main>
    </>
  )
}
