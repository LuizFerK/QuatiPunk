import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/navbar'
import Header from '../components/header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      
      <div style={{ width: "100%" }}>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
