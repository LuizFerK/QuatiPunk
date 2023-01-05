import api from '.'

export async function getProducts(){
  return await api.get<Product[]>('/products')
}