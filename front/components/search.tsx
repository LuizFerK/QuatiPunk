import {
  TbSearch,
  TbSortDescending,
  TbSortAscending,
  TbArrowRight
} from 'react-icons/tb'
import Input from './input'
import Button from './button'
import Category from './category'

import styles from '../styles/components/search.module.css'

interface SearchProps {
  placeholder: string
  categories?: boolean
}

export default function Search({ placeholder, categories }: SearchProps) {
  const categoryList: Category[] = ["electrical", "paints", "hardware", "connections", "cement", "finishes"]

  return (
    <section className={styles.container}>
      <Input icon={TbSearch} placeholder={placeholder} />
      {categories && (
        <div className={styles.categories}>
          {categoryList.map(category => <Category key={category} type={category} />)}
        </div>
      )}
      <div className={styles.buttons}>
        <Button icon={TbSortDescending} secondary active={true} />
        <Button icon={TbSortAscending} secondary active={false} />
        <Button icon={TbArrowRight} />
      </div>
    </section>
  )
}
