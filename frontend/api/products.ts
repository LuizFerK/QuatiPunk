import api from '.'

export async function getProducts() {
  return await api.get<Product[]>('/products')
}

export async function getProduct(id: string) {
  return await api.get<Product>(`/products/${id}`)
}

export async function createProduct(data: Product) {
  return await api.post<Product>(`/products`, data)
}

export async function updateProduct(id: number, data: Product) {
  return await api.put<Product>(`/products/${id}`, data)
}

export async function deleteProduct(id: number) {
  return await api.delete<Product>(`/products/${id}`)
}