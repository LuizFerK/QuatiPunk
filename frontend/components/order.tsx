import Link from 'next/link'
import { Poppins } from '@next/font/google'
import { TbBarcode, TbCalendarTime, TbUser, TbPhone, TbCircleSquare } from 'react-icons/tb'
import parsePhone from '../utils/parsePhone'
import parseDate from '../utils/parseDate'
import Product from './product'

import styles from '../styles/components/order.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface OrderProps {
  order: Order
}

export default function Order({ order }: OrderProps) {
  return (
    <li className={styles.li}>
      <Link href={`/venda/${order.id}`}>
        <header className={styles.header}>
          <section className={styles.id}>
            <p className={poppins.className}>{order.id}</p>
            <TbBarcode />
          </section>
          <section className={styles.infos}>
            <div>
              <TbCalendarTime />
              <p className={poppins.className}>{parseDate(order.date)}</p>
            </div>
            {order.client && order.client.cpf ? (
              <>
                <div>
                  <TbUser />
                  <p className={poppins.className}>{order.client.name}</p>
                </div>
                <div>
                  <TbPhone />
                  <p className={poppins.className}>{parsePhone(order.client.phone)}</p>
                </div>
              </>
            ) : (
              <div>
                <TbUser />
                <p className={poppins.className}>Anônimo</p>
              </div>
            )}
          </section>
          <section className={styles.values}>
            <div>
              <TbCircleSquare />
              <p className={poppins.className}>{order.products.length}</p>
            </div>
            <div>
              <span className={poppins.className}>R$</span>
              <span className={poppins.className}>{order.price}</span>
            </div>
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
