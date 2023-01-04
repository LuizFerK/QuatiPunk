type Category = "electrical" | "paints" | "hardware" | "connections" | "cement" | "finishes"

interface Client {
  id: string
  name: string
  phone: string
  cpf: string
  address: string
  mail: string
}

interface Product {
  id: string
  name: string
  quantity: number
  max_quantity: number
  category: Category
  price: number
  um: string
}
