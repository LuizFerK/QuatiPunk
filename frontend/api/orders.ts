import api from '.'
import { updateProduct } from './products'

export async function getOrders() {
  return await api.get<Order[]>('/orders')
}

export async function getOrder(id: string) {
  return await api.get<Order>(`/orders/${id}`)
}

export async function createOrder(data: OrderCreate) {
  const products = data.products.map(op => {
    updateProduct(op.product.id, {
      ...op.product,
      quantity: op.product.quantity - op.quantity
    })

    return { productId: op.product.id, quantity: op.quantity }
  })

  return await api.post<Order>(`/orders`, { ...data, products})
}

export async function deleteOrder(id: number) {
  return await api.delete<Order>(`/orders/${id}`)
}