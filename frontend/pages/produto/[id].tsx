import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getProduct, updateProduct, deleteProduct } from '../../api/products'
import {
  TbCircleSquare,
  TbClipboard,
  TbCashBanknote,
  TbArrowRight,
  TbPackage,
  TbPackageOff,
  TbRuler,
  TbTrash
} from 'react-icons/tb'

import Input from '../../components/input'
import Button from '../../components/button'
import Counter from '../../components/counter'
import Select from '../../components/select'
import Category from '../../components/category'
import Spinner from '../../components/spinner'

import styles from '../../styles/pages/produto.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function ProductDetails() {
  const { id } = useRouter().query
  const { push } = useRouter()
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Error[]>([])
  const [isFilled, setIsFilled] = useState(false)

  const [product, setProduct] = useState<Product>({
    quantity: 0,
    minQuantity: 0,
    um: "cm"
  } as Product)
  
  const categoryList: Category[] = ["electrical", "paints", "hardware", "connections", "cement", "finishes"]

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getProduct(id as string)
      setIsLoading(false)
      setProduct(data)
    }

    id && fetchProduct()
  }, [id])

  useEffect(() => {
    // validade formats
    if (
      !!product.name &&
      !!product.price &&
      !!product.category
    ) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [product])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors([])

    if (product.quantity < product.minQuantity) {
      setErrors(lastErrors => [{ field: "minQuantity", message: "Estoque mínimo deve ser menor ou igual ao estoque" }, ...lastErrors] as Error[])
    }

    await updateProduct(product.id, product)
  }

  async function handleDelete() {
    await deleteProduct(product.id)
    push('/produtos')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!product) {
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
          <TbCircleSquare />
        </div>
        <p className={poppins.className}>Formulário de cadastro de produto:</p>
        {errors.length > 0 && (
          <section className={styles.errors}>
            {errors.map(error => (
              <p className={poppins.className}>{error.message}</p>
            ))}
          </section>
        )}
        <Input
          icon={TbCircleSquare}
          label="Nome:"
          placeholder="Lâmpada"
          disabled={!token}
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
        <Input
          icon={TbClipboard}
          label="Descrição:"
          placeholder="Descrição..."
          disabled={!token}
          value={product.description}
          onChange={e => setProduct({ ...product, description: e.target.value })}
        />
        <Input
          icon={TbCashBanknote}
          label="Preço:"
          placeholder="9,90"
          type="number"
          disabled={!token}
          value={product.price}
          onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
        />
        <div>
          <div>
            <label className={poppins.className}>Categoria:</label>
            <div className={styles.categories}>
              {categoryList.map(category => (
                <button
                  key={category}
                  type="button"
                  disabled={!token}
                  onClick={() => setProduct({ ...product, category: category })}
                >
                  <Category
                    type={category}
                    selectable={!!token}
                    selected={category === product.category}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={poppins.className}>U.m.:</label>
            <Select
              icon={TbRuler}
              value={product.um || "cm"}
              options={["cm", "m", "mm"]}
              disabled={!token}
              onSelect={um => setProduct({ ...product, um: um })}
            />
          </div>
        </div>
        <div>
          <Counter
            icon={TbPackage}
            label="Estoque atual:"
            disabled={!token}
            value={product.quantity}
            onChange={quantity => setProduct({ ...product, quantity: Number(quantity) })}
          />
          <Counter
            icon={TbPackageOff}
            label="Estoque mínimo:"
            disabled={!token}
            value={product.minQuantity}
            onChange={minQuantity => setProduct({ ...product, minQuantity: Number(minQuantity) })}
          />
        </div>
        {token && <div>
          <Button icon={TbTrash} secondary onClick={handleDelete} />
          <Button disabled={!isFilled} icon={TbArrowRight} />
        </div>}
      </form>
    </>
  )
}
