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
}

export default function Search({ placeholder, clients, categories }: SearchProps) {
  const [selectedClient, setSelectedClient] = useState("");
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

  return (
    <section className={styles.container}>
      <Input icon={TbSearch} placeholder={placeholder} width={clients ? 326 : 490} />
      {clients && (
        <Select
          icon={TbUser}
          value={selectedClient}
          options={clientList}
          onSelect={value => setSelectedClient(value)}
          width={200}
          placeholder='Nome do cliente...'
        />
      )}
      {categories && (
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
      )}
      <div className={styles.buttons}>
        <Button icon={TbSortDescending} secondary active={true} />
        <Button icon={TbSortAscending} secondary active={false} />
        <Button icon={TbArrowRight} />
      </div>
    </section>
  )
}
