import { Poppins } from '@next/font/google'
import { TbBarcode, TbCalendarTime, TbUser, TbPhone, TbCircleSquare } from 'react-icons/tb'
import getWordInitials from '../utils/getWordInitials'
import parsePhone from '../utils/parsePhone'
import Product from './product'

import styles from '../styles/components/order.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface OrderProps {
  order: Order
}

export default function Order({ order }: OrderProps) {
  return (
    <li className={styles.li}>
      <header className={styles.header}>
        <section className={styles.id}>
          <p className={poppins.className}>{order.id}</p>
          <TbBarcode />
        </section>
        <section className={styles.infos}>
          <div>
            <TbCalendarTime />
            <p className={poppins.className}>{order.date}</p>
          </div>
          <div>
            <TbUser />
            <p className={poppins.className}>{order.client.name}</p>
          </div>
          <div>
            <TbPhone />
            <p className={poppins.className}>{parsePhone(order.client.phone)}</p>
          </div>
        </section>
        <section className={styles.values}>
          <div>
            <TbCircleSquare />
            <p className={poppins.className}>{order.quantity}</p>
          </div>
          <div>
            <span className={poppins.className}>R$</span>
            <span className={poppins.className}>{order.price}</span>
          </div>
        </section>
      </header>
      <ol>
        {order.products.map(product => <Product key={product.id} product={product} small />)}
      </ol>
    </li>
  )
}
