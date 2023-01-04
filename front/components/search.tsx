import {
  TbSearch,
  TbSortDescending,
  TbSortAscending,
  TbArrowRight
} from 'react-icons/tb'
import Input from './input'
import Button from './button'

import styles from '../styles/components/search.module.css'

export default function Search() {
  return (
    <section className={styles.container}>
      <Input icon={TbSearch} placeholder="Nome do cliente..." />
      <div className={styles.buttons}>
        <Button icon={TbSortDescending} secondary active={true} />
        <Button icon={TbSortAscending} secondary active={false} />
        <Button icon={TbArrowRight} />
      </div>
    </section>
  )
}
