"use client"

import { useEffect, useState } from "react"

const WORDS = ["Teleiosis", "Perfection", "Sonship", "Royalty", "Priesthood", "Resurrection"]
const TYPE_SPEED = 100
const DELETE_SPEED = 50
const PAUSE_AFTER = 2500

export function FlipText() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [displayText, setDisplayText] = useState(WORDS[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const handleTyping = () => {
      const fullWord = WORDS[currentWordIdx]
      
      if (!isDeleting) {
        // Typing
        if (displayText.length < fullWord.length) {
          setDisplayText(fullWord.slice(0, displayText.length + 1))
          timer = setTimeout(handleTyping, TYPE_SPEED + (Math.random() - 0.5) * 20)
        } else {
          // Finished typing word
          setIsBlinking(true)
          timer = setTimeout(() => {
            setIsBlinking(false)
            setIsDeleting(true)
          }, PAUSE_AFTER)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(fullWord.slice(0, displayText.length - 1))
          timer = setTimeout(handleTyping, DELETE_SPEED + (Math.random() - 0.5) * 8)
        } else {
          // Finished deleting
          setIsDeleting(false)
          setCurrentWordIdx((prev) => (prev + 1) % WORDS.length)
          timer = setTimeout(handleTyping, 160)
        }
      }
    }

    timer = setTimeout(handleTyping, isDeleting ? DELETE_SPEED : TYPE_SPEED)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWordIdx])

  return (
    <span aria-live="polite" aria-atomic="true" className="inline-flex items-center">
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className={isBlinking ? "animate-pulse" : ""}
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.8em",
          background: "currentColor",
          marginLeft: "4px",
          verticalAlign: "middle",
          borderRadius: "1px",
        }}
      />
    </span>
  )
}
