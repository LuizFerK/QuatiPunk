import api from '.'

export async function getOrders(){
  return await api.get<Order[]>('/orders')
}