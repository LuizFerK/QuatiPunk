import { Poppins } from '@next/font/google'
import { TbBox } from 'react-icons/tb'
import getWordInitials from '../utils/getWordInitials'
import Category from '../components/category'

import styles from '../styles/components/product.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface ProductProps {
  product: Product
}

export default function Product({ product }: ProductProps) {
  return (
    <li className={styles.li}>
      <aside className={styles.aside}>
        <span className={poppins.className}>{product.id}</span>
      </aside>
      <div className={styles.content}>
        <section>
          <div className={styles.pseudoImg}>
            <span className={poppins.className}>{getWordInitials(product.name)}</span>
          </div>
          <p className={poppins.className}>{product.name}</p>
        </section>
        <section className={styles.infos}>
          <div>
            <TbBox />
            <p className={poppins.className}>{product.quantity}</p>
          </div>
          <Category type={product.category} />
          <div>
            <span className={poppins.className}>R$</span>
            <span className={poppins.className}>{product.price}</span>
          </div>
        </section>
      </div>
    </li>
  )
}
