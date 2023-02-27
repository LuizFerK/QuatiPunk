type Category = "electrical" | "paints" | "hardware" | "connections" | "cement" | "finishes"

type Payment = "card" | "cash" | "pix"

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

interface OrderProduct {
  quantity: number
  product: Product
}

interface Order {
  id: number
  date: string
  payment: Payment
  price: number
  client: Client
  products: OrderProduct[]
}

interface OrderProductCreate {
  quantity: number
  productId: number
}

interface OrderCreate {
  date: string
  payment: Payment
  price: number
  clientCpf: string | null
  products: OrderProductCreate[]
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
