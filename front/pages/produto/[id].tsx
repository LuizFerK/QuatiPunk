import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getProduct } from '../../api/products'
import {
  TbCircleSquare,
  TbClipboard,
  TbArrowRight,
  TbPackage,
  TbPackageOff,
  TbRuler
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
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [product, setProduct] = useState<Product>({} as Product)
  
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
    if (!!name && !!description) {
      return setIsFilled(true)
    }

    setIsFilled(false)
  }, [name, description])

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
      <main className={styles.container}>
        <div className={styles.logo}>
          <TbCircleSquare />
        </div>
        <p className={poppins.className}>Formulário de cadastro de produto:</p>
        {/* <p className={poppins.className}>
          {isErrored ? "Senha incorreta, tente novamente." : "Para entrar, por favor, digite a senha de acesso:"}
        </p> */}
        <Input
          icon={TbCircleSquare}
          label="Nome:"
          placeholder="Lâmpada"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          icon={TbClipboard}
          label="Descrição:"
          placeholder="LED 20W"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div>
          <div>
            <label className={poppins.className}>Categoria:</label>
            <div className={styles.categories}>
              {categoryList.map(category => (
                <button key={category}>
                  <Category
                    type={category}
                    selectable
                    selected={false}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={poppins.className}>U.m.:</label>
            <Select icon={TbRuler} placeholder="cm" value={""} options={[]} />
          </div>
        </div>
        <div>
          <Counter icon={TbPackage} label="Estoque atual:" value={0} />
          <Counter icon={TbPackageOff} label="Estoque mínimo:" value={0} />
        </div>
        <Button disabled={!isFilled} icon={TbArrowRight} onClick={() => {}} />
      </main>
    </>
  )
}
