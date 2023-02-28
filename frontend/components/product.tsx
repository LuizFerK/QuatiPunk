import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { Poppins } from '@next/font/google'
import { TbBox } from 'react-icons/tb'
import getWordInitials from '../utils/getWordInitials'
import classNames from 'classnames'

import Category from '../components/category'

import styles from '../styles/components/product.module.css'
import Counter from './counter'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface ProductProps {
  product: Product
  small?: boolean
  counter?: boolean
  disabled?: boolean
  counterValue?: number
  maxQuantity?: number
  forceHover?: boolean
  onChangeCounter?: (value: number) => void
  onRemoveProduct?: () => void
}

interface LinkWrapperProps extends LinkProps {
  disabled?: boolean
  children: ReactNode
}

function LinkWrapper({ disabled, href, children, ...props }: LinkWrapperProps) {
  if (disabled) {
    return (
      <a onClick={e => e.preventDefault()}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default function Product({
  product,
  small,
  counter,
  disabled,
  counterValue,
  maxQuantity,
  forceHover,
  onChangeCounter,
  onRemoveProduct
}: ProductProps) {
  const productStyle = classNames({
    [styles.li]: true,
    [styles.small]: small,
    [styles.counter]: counter && !forceHover
  })

  return (
    <li className={productStyle}>
      <LinkWrapper href={`/produto/${product.id}`} disabled={!!counter && !forceHover}>
        {!small && (
          <aside className={styles.aside}>
            <span className={poppins.className}>{product.id}</span>
          </aside>
        )}
        <div className={styles.content}>
          <section>
            <div className={styles.pseudoImg}>
              <span className={poppins.className}>{getWordInitials(product.name)}</span>
            </div>
            <p className={poppins.className}>{product.name}</p>
          </section>
          <section className={styles.infos}>
            {!counter ? (
              <>
                <div>
                  <TbBox />
                  <p className={poppins.className}>{product.quantity}</p>
                </div>
                <Category type={product.category} />
                <div>
                  <span className={poppins.className}>R$</span>
                  <span className={poppins.className}>{product.price.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <>
                <Counter
                  icon={TbBox}
                  value={counterValue || 0}
                  onChange={onChangeCounter}
                  disabled={disabled}
                  removable
                  onRemove={onRemoveProduct}
                  noBackground
                  maxQuantity={maxQuantity}
                />
                {forceHover && (
                  <Category type={product.category} selected />
                )}
              </>
            )}
          </section>
        </div>
      </LinkWrapper>
    </li>
  )
}
