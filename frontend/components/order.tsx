import Link from 'next/link'
import { Poppins } from '@next/font/google'
import { TbBarcode, TbCalendarTime, TbUser, TbPhone, TbCircleSquare } from 'react-icons/tb'
import parsePhone from '../utils/parsePhone'
import parseDate from '../utils/parseDate'
import Product from './product'

import styles from '../styles/components/order.module.css'
import Tooltip from './tooltip'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface OrderProps {
  order: Order
}

export default function Order({ order }: OrderProps) {
  return (
    <li className={styles.li}>
      <Link href={`/venda/${order.id}`}>
        <header className={styles.header}>
          <Tooltip label="Código">
            <section className={styles.id}>
              <p className={poppins.className}>{order.id}</p>
              <TbBarcode />
            </section>
          </Tooltip>
          <section className={styles.infos}>
            <div>
              <Tooltip label="Data da venda">
                <TbCalendarTime />
              </Tooltip>
              <p className={poppins.className}>{parseDate(order.date)}</p>
            </div>
            {order.client && order.client.cpf ? (
              <>
                <div>
                  <Tooltip label="Nome do cliente">
                    <TbUser />
                  </Tooltip>
                  <p className={poppins.className}>{order.client.name}</p>
                </div>
                <div>
                  <TbPhone />
                  <p className={poppins.className}>{parsePhone(order.client.phone)}</p>
                </div>
              </>
            ) : (
              <div>
                <Tooltip label="Venda para cliente não cadastrado">
                  <TbUser />
                </Tooltip>
                <p className={poppins.className}>Anônimo</p>
              </div>
            )}
          </section>
          <section className={styles.values}>
            <div>
              <Tooltip label="Quantidade de produtos">
                <TbCircleSquare />
              </Tooltip>
              <p className={poppins.className}>{order.products.length}</p>
            </div>
            <Tooltip label="Preço">
              <span className={poppins.className}>R$</span>
              <span className={poppins.className}>{order.price.toFixed(2)}</span>
            </Tooltip>
          </section>
        </header>
      </Link>
      <ol>
        {order.products.map(product => (
          <Product
            key={product.product.id}
            product={product.product}
            counterValue={product.quantity}
            small
            counter
            disabled
            forceHover
          />
        ))}
      </ol>
    </li>
  )
}
