export default function parseDate(date: string) {
  return new Date(date).toLocaleDateString("pt-br")
}