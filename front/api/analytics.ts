const baseUrl = "http://localhost:3000/analytics"

export async function getMonths(): Promise<string[]> {
  const response = await fetch(`${baseUrl}/months`)
  return await response.json()
}