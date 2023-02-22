export default function getWordInitials(word: string) {
  return word.split(" ").slice(0, 2).map(w => w.slice(0, 1)).join("").toUpperCase()
}