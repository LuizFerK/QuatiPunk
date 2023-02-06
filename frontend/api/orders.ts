import api from '.'

export async function getOrders() {
  return await api.get<Order[]>('/orders')
}

export async function getOrder(id: string) {
  return await api.get<Order>(`/orders/${id}`)
}