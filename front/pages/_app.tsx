import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import NavBar from '../components/navbar'
import Header from '../components/header'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      
      <div style={{ width: "100%" }}>
        <Header />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
