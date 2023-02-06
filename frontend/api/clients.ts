import api from '.'

export async function getClients() {
  return await api.get<Client[]>('/clients')
}

export async function getClient(id: string) {
  return await api.get<Client>(`/clients/${id}`)
}