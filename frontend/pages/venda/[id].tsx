import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getOrder, deleteOrder } from '../../api/orders'
import { getClients } from '../../api/clients'
import { getProducts } from '../../api/products'
import {
  TbReportMoney,
  TbUser,
  TbCircleSquare,
  TbTrash
} from 'react-icons/tb'

import Select from '../../components/select'
import Button from '../../components/button'
import Spinner from '../../components/spinner'

import styles from '../../styles/pages/venda.module.css'
import Product from '../../components/product'
import Payments from '../../components/payments'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function OrderDetails() {
  const { id } = useRouter().query
  const { push } = useRouter()
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [payment, setPayment] = useState<Payment>("card")
  const [client, setClient] = useState<Client>({ name: "Anônimo" } as Client)
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([])

  const [order, setOrder] = useState<Order>({} as Order)

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await getOrder(id as string)
      setIsLoading(false)
      setOrder(data)
      setPayment(data.payment)
      setClient(data.client || { name: "Anônimo" } as Client)
      setSelectedProducts(data.products)
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

  async function handleDelete() {
    await deleteOrder(order.id)
    push('/vendas')
  }

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
        <Select
          icon={TbUser}
          label="Cliente:"
          disabled
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
          disabled
          value={{ name: `${selectedProducts.length} produtos selecionados` }}
          placeholder={`${selectedProducts.length} produtos selecionados`}
          options={products}
          formatter={product => product.name}
          onSelect={product => setSelectedProducts([...selectedProducts, { product: product, quantity: 1 }])}
          width="100%"
          style={{ zIndex: 1 }}
        />
        <ol>
          {selectedProducts.length > 0 && selectedProducts.map(product => (
            <Product
              key={product.product.id}
              product={product.product}
              counterValue={product.quantity}
              disabled
              small
              counter
            />
          ))}
        </ol>
        <Payments value={payment} onChange={payment => setPayment(payment)} disabled  />
        {token && <Button icon={TbTrash} secondary onClick={handleDelete} />}
      </main>
    </>
  )
}
