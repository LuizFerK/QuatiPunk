import Head from 'next/head'
import { Poppins } from '@next/font/google'
import styles from '../styles/pages/analises.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export default function Analytics() {
  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={poppins.className}>Análises</h1>
      </main>
    </>
  )
}
