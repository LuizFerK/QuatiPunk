import { useState, useEffect } from 'react'
import {
  TbSearch,
  TbUser,
  TbSortDescending,
  TbSortAscending,
  TbArrowRight
} from 'react-icons/tb'
import { getClients } from '../api/clients'
import Input from './input'
import Button from './button'
import Select from './select'
import Category from './category'

import styles from '../styles/components/search.module.css'

interface SearchProps {
  placeholder: string
  clients?: boolean
  categories?: boolean
  onChange?: (opts: Search) => void
}

export default function Search({ placeholder, clients, categories, onChange }: SearchProps) {
  const [opts, setOpts] = useState<Search>({} as Search);
  const [clientList, setClientList] = useState<string[]>([]);
  
  const categoryList: Category[] = ["electrical", "paints", "hardware", "connections", "cement", "finishes"]

  useEffect(() => {
    if (clientList) {
      const fetchClients = async () => {
        const { data: clients } = await getClients()
        clients && setClientList(clients.map(client => client.name))
      }

      fetchClients()
    }
  }, [])

  function handleSelectCategory(category: Category) {
    if (category === opts.category) {
      const {category, ...newOpts} = opts
      setOpts(newOpts)
    } else {
      setOpts({...opts, category: category})
    }
  }

  function handleSearch() {
    onChange && onChange({...opts, default: false})
  }

  return (
    <section className={styles.container}>
      <Input
        icon={TbSearch}
        placeholder={placeholder}
        width={clients ? 326 : 490}
        onChange={e => setOpts({...opts, input: e.target.value})}
      />
      {clients && (
        <Select
          icon={TbUser}
          value={opts.client}
          options={clientList}
          onSelect={client => setOpts({...opts, client: client})}
          width={200}
          nullable
          placeholder='Nome do cliente...'
        />
      )}
      {categories && (
        <div className={styles.categories}>
          {categoryList.map(category => (
            <button key={category} type="button" onClick={() => handleSelectCategory(category)}>
              <Category
                type={category}
                selectable
                selected={category === opts.category}
              />
            </button>
          ))}
        </div>
      )}
      <div className={styles.buttons}>
        <Button
          icon={TbSortDescending}
          secondary
          active={opts.order === "desc"}
          onClick={() => setOpts({...opts, order: "desc"})}
        />
        <Button
          icon={TbSortAscending}
          secondary
          active={opts.order === "asc"}
          onClick={() => setOpts({...opts, order: "asc"})}
        />
        <Button icon={TbArrowRight} onClick={handleSearch} />
      </div>
    </section>
  )
}
