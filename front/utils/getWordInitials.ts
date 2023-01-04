export default function getWordInitials(word: string) {
  return word.split(" ").map(w => w.slice(0, 1)).join("").toUpperCase()
}