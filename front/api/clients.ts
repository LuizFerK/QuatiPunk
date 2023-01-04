const baseUrl = "http://localhost:3000"

export async function getClients(): Promise<Client[]> {
  const response = await fetch(`${baseUrl}/clients`)
  return await response.json()
}