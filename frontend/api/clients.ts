import api from '.'

export async function getClients() {
  return await api.get<Client[]>('/clients')
}

export async function getClient(id: string) {
  return await api.get<Client>(`/clients/${id}`)
}

export async function createClient(data: Client) {
  return await api.post<Client>(`/clients`, data)
}

export async function updateClient(id: string, data: Client) {
  return await api.put<Client>(`/clients/${id}`, data)
}

export async function deleteClient(id: string) {
  return await api.delete<Client>(`/clients/${id}`)
}