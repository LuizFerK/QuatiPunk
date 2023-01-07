import api from '.'

export async function getProducts() {
  return await api.get<Product[]>('/products')
}

export async function getProduct(id: string) {
  return await api.get<Product>(`/products/${id}`)
}