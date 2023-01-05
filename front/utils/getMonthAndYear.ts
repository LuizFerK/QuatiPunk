export default function getMonthAndYear(date: string) {
  const [m, y] = date.split("/")
  const parsedDate = new Date(Number(y), Number(m) - 1).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
  return parsedDate.slice(0, 1).toUpperCase() + parsedDate.slice(1)
}