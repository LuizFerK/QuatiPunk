import api from '.'

export async function getClients(){
  return await api.get<Client[]>('/clients')
}