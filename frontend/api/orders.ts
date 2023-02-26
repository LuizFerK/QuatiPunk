import api from '.'

export async function getOrders() {
  return await api.get<Order[]>('/orders')
}

export async function getOrder(id: string) {
  return await api.get<Order>(`/orders/${id}`)
}

export async function createOrder(data: OrderCreate) {
  return await api.post<Order>(`/orders`, data)
}

export async function deleteOrder(id: number) {
  return await api.delete<Order>(`/orders/${id}`)
}