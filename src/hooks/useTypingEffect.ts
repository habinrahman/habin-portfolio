import { useEffect, useState } from 'react'

export function useTypingEffect(words: string[], speed = 60, pause = 1500) {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const activeWord = words[wordIndex] ?? ''
    const atEnd = letterIndex >= activeWord.length
    const atStart = letterIndex <= 0

    let timeout = speed
    if (!deleting && atEnd) timeout = pause
    if (deleting) timeout = Math.max(24, Math.floor(speed * 0.5))

    const id = window.setTimeout(() => {
      if (!deleting && atEnd) {
        setDeleting(true)
        return
      }
      if (deleting && atStart) {
        setDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
      setLetterIndex((prev) => prev + (deleting ? -1 : 1))
    }, timeout)

    return () => window.clearTimeout(id)
  }, [words, wordIndex, letterIndex, deleting, speed, pause])

  const currentWord = words[wordIndex] ?? ''
  return `${currentWord.slice(0, letterIndex)}`
}
