import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getOrder, createOrder } from '../../api/orders'
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
import NoAccess from '../../components/noAccess'
import Payments from '../../components/payments'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function OrderDetails() {
  const { id } = useRouter().query
  const { push } = useRouter()
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isFilled, setIsFilled] = useState(false)

  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [payment, setPayment] = useState<Payment>("card")
  const [client, setClient] = useState<Client>({ name: "Anônimo" } as Client)
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([])

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await getOrder(id as string)
      setIsLoading(false)
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
      setProducts(products.filter(product => product.quantity > 0))

      setIsLoading(false)
    }

    fetchSelectsData()
  }, [])

  useEffect(() => {
    // validade formats
    if (selectedProducts.length > 0) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [selectedProducts])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const order: OrderCreate = {
      date: new Date(Date.now()).toISOString(),
      payment: payment,
      clientCpf: client.cpf || null,
      price: selectedProducts.reduce((price, product) => price + product.product.price, 0),
      products: selectedProducts,
    }

    const { data } = await createOrder(order)
    push(`/venda/${data.id}`)
  }

  function handleChangeProductCounter({ product }: OrderProduct, quantity: number) {
    const updatedSelectedProducts = selectedProducts.map(orderProduct => {
      if (orderProduct.product.id !== product.id) return orderProduct

      return { product, quantity }
    })

    setSelectedProducts(updatedSelectedProducts)
  }

  function handleRemoveProduct({ product }: OrderProduct) {
    const filteredSelectedProducts = selectedProducts.filter(orderProduct => orderProduct.product.id !== product.id)
    setSelectedProducts(filteredSelectedProducts)
  }

  if (!token) {
    return <NoAccess />
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!client.name) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
        <div className={styles.logo}>
          <TbReportMoney />
        </div>
        <p className={poppins.className}>Formulário de cadastro de venda:</p>
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
          value={{ name: "Selecionar os produtos da venda..." }}
          placeholder="Selecionar os produtos da venda..."
          options={products.filter(product => !selectedProducts.some(op => op.product.id === product.id))}
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
              onChangeCounter={quantity => handleChangeProductCounter(product, quantity)}
              onRemoveProduct={() => handleRemoveProduct(product)}
              small
              counter
              maxQuantity={product.product.quantity}
            />
          ))}
        </ol>
        <Payments value={payment} onChange={payment => setPayment(payment)} />
        <Button label="Criar venda" disabled={!isFilled} icon={TbArrowRight} />
      </form>
    </>
  )
}
