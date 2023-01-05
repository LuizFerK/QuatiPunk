const baseUrl = "http://localhost:3000/orders"

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(baseUrl)
  return await response.json()
}