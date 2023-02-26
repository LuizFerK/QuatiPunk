import Link from 'next/link'
import { Poppins } from '@next/font/google'
import { TbPhone } from 'react-icons/tb'
import getWordInitials from '../utils/getWordInitials'
import parsePhone from '../utils/parsePhone'

import styles from '../styles/components/client.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface ClientProps {
  client: Client
}

export default function Client({ client }: ClientProps) {
  return (
    <li className={styles.li}>
      <Link href={`/cliente/${client.id}`}>
        <aside className={styles.aside}>
          <span className={poppins.className}>{client.id}</span>
        </aside>
        <div className={styles.content}>
          <section>
            <div className={styles.pseudoImg}>
              <span className={poppins.className}>{getWordInitials(client.name)}</span>
            </div>
            <p className={poppins.className}>{client.name}</p>
          </section>
          <section className={styles.infos}>
            <TbPhone />
            <p className={poppins.className}>{parsePhone(client.phone)}</p>
          </section>
        </div>
      </Link>
    </li>
  )
}
