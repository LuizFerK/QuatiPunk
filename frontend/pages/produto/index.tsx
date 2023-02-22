import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { createProduct } from '../../api/products'
import {
  TbCircleSquare,
  TbClipboard,
  TbCashBanknote,
  TbArrowRight,
  TbPackage,
  TbPackageOff,
  TbRuler,
} from 'react-icons/tb'

import Input from '../../components/input'
import Button from '../../components/button'
import Counter from '../../components/counter'
import Select from '../../components/select'
import Category from '../../components/category'

import styles from '../../styles/pages/produto.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function ProductDetails() {
  const { push } = useRouter()
  const { token } = useAuth()

  const [errors, setErrors] = useState<Error[]>([])
  const [isFilled, setIsFilled] = useState(false)

  const [product, setProduct] = useState<Product>({
    quantity: 0,
    maxQuantity: 0,
    um: "cm"
  } as Product)
  
  const categoryList: Category[] = ["electrical", "paints", "hardware", "connections", "cement", "finishes"]

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

    if (product.quantity > product.maxQuantity) {
      setErrors(lastErrors => [{ field: "maxQuantity", message: "Estoque mínimo deve ser menor ou igual ao estoque" }, ...lastErrors] as Error[])
    }

    const { data } = await createProduct(product)
    
    push(`/produto/${data.id}`)
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
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
        <Input
          icon={TbClipboard}
          label="Descrição:"
          placeholder="LED 20W"
          value={product.description}
          onChange={e => setProduct({ ...product, description: e.target.value })}
        />
        <Input
          icon={TbCashBanknote}
          label="Preço:"
          placeholder="9,90"
          type="number"
          value={product.price}
          onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
        />
        <div>
          <div>
            <label className={poppins.className}>Categoria:</label>
            <div className={styles.categories}>
              {categoryList.map(category => (
                <button key={category} onClick={() => setProduct({ ...product, category: category })} type="button">
                  <Category
                    type={category}
                    selectable
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
              onSelect={um => setProduct({ ...product, um: um })}
            />
          </div>
        </div>
        <div>
          <Counter
            icon={TbPackage}
            label="Estoque atual:"
            value={product.quantity}
            onChange={quantity => setProduct({ ...product, quantity: Number(quantity) })}
          />
          <Counter
            icon={TbPackageOff}
            label="Estoque mínimo:"
            value={product.maxQuantity}
            onChange={maxQuantity => setProduct({ ...product, maxQuantity: Number(maxQuantity) })}
          />
        </div>
        <div>
          <Button disabled={!isFilled} icon={TbArrowRight} />
        </div>
      </form>
    </>
  )
}
