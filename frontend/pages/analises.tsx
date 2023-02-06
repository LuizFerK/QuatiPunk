import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getMonths } from '../api/analytics'
import { TbCalendarTime } from 'react-icons/tb'
import getMonthAndYear from '../utils/getMonthAndYear'

import Select from '../components/select'
import Spinner from '../components/spinner'

import styles from '../styles/pages/analises.module.css'

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true)
  const [months, setMonths] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date(Date.now()).toLocaleDateString().split("/")
    return date[0] + "/" + date[2]
  });

  useEffect(() => {
    async function fetchMonths() {
      const { data } = await getMonths()
      setIsLoading(false)
      setMonths(data)
    }

    fetchMonths()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!months) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>QuatiPunk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Select
          icon={TbCalendarTime}
          value={selectedMonth}
          options={months}
          formatter={getMonthAndYear}
          onSelect={value => setSelectedMonth(value)}
          width="180px"
          confirmButton
        />
      </main>
    </>
  )
}
