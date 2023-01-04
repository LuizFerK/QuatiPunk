const baseUrl = "http://localhost:3000/products"

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(baseUrl)
  return await response.json()
}