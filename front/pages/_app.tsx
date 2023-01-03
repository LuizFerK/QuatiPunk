import '../styles/globals.css'
import NavBar from '../components/navbar'
import Header from '../components/header'
import type { AppProps } from 'next/app'

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
