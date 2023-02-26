import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getOrder } from '../../api/orders'
import { getClients } from '../../api/clients'
import { getProducts } from '../../api/products'
import {
  TbReportMoney,
  TbUser,
  TbCircleSquare,
  TbArrowRight
} from 'react-icons/tb'

import Select from '../../components/select'
import Button from '../../components/button'
import Spinner from '../../components/spinner'

import styles from '../../styles/pages/venda.module.css'
import Product from '../../components/product'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function OrderDetails() {
  const { id } = useRouter().query
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [client, setClient] = useState<Client>({ name: "Anônimo" } as Client)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const [order, setOrder] = useState<Order>({} as Order)

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await getOrder(id as string)
      setIsLoading(false)
      setOrder(data)
    }

    id && fetchOrder()
  }, [id])

  useEffect(() => {
    async function fetchSelectsData() {
      const { data: clients } = await getClients()
      setClients(clients)

      const { data: products } = await getProducts()
      setProducts(products)

      setIsLoading(false)
    }

    fetchSelectsData()
  }, [])

  useEffect(() => {
    // validade formats
    if (!!client && products.length > 0) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [client, products])

  if (isLoading) {
    return <Spinner />
  }

  if (!order) {
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
        <div className={styles.logo}>
          <TbReportMoney />
        </div>
        <p className={poppins.className}>Formulário de cadastro de venda:</p>
        {/* <p className={poppins.className}>
          {isErrored ? "Senha incorreta, tente novamente." : "Para entrar, por favor, digite a senha de acesso:"}
        </p> */}
        <Select
          icon={TbUser}
          label="Cliente:"
          value={client}
          options={clients}
          formatter={client => client.name}
          onSelect={client => setClient(client)}
          width="100%"
          style={{ zIndex: 2 }}
        />
        <Select
          icon={TbCircleSquare}
          label="Produtos:"
          value={{ name: "Selecionar mais produtos..." }}
          placeholder="Selecione o primeiro produto da venda..."
          options={products}
          formatter={product => product.name}
          onSelect={product => setSelectedProducts([...selectedProducts, product])}
          width="100%"
          style={{ zIndex: 1 }}
        />
        <ol>
          {selectedProducts.length > 0 && selectedProducts.map(product => <Product key={product.id} product={product} small counter />)}
        </ol>
        <Button disabled={!isFilled} icon={TbArrowRight} onClick={() => {}} />
      </main>
    </>
  )
}
