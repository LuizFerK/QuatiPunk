const baseUrl = "http://localhost:3000/clients"

export async function getClients(): Promise<Client[]> {
  const response = await fetch(baseUrl)
  return await response.json()
}