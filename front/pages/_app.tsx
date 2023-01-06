import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

import NavBar from '../components/navbar'
import Header from '../components/header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      
      <div style={{ width: "100%" }}>
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}
