type Category = "electrical" | "paints" | "hardware" | "connections" | "cement" | "finishes"

interface Client {
  id: number
  name: string
  phone: string
  cpf: string
  address: string
  mail: string
}

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  minQuantity: number
  category: Category
  price: number
  um: string
}

interface Order {
  id: number
  date: string
  payment: string
  price: number
  client: Client
  products: Product[]
}

interface OrderCreate {
  date: string
  payment: string
  price: number
  clientCpf: string | null
  productIds: number[]
}

interface Error {
  field: string
  message: string
}

interface Search {
  input?: string
  order?: "asc" | "desc"
  category?: Category
  client?: string
  default: boolean
}
