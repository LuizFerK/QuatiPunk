import api from '.'

export async function getMonths(){
  return await api.get<string[]>('/analytics/months')
}