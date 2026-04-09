"use client"

import { useEffect, useRef, useState } from "react"

const WORDS = ["Teleiosis", "Perfection", "Sonship", "Royalty", "Priesthood"]
const TYPE_SPEED   = 100
const DELETE_SPEED = 50
const PAUSE_AFTER  = 2500

export function FlipText() {
  // Write directly to the DOM, zero React re-renders per character
  const textRef    = useRef<HTMLSpanElement>(null)
  const [blinking, setBlinking] = useState(false)
  const timer      = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    let wordIdx  = 0
    let charIdx  = WORDS[0].length // start fully typed

    // Show first word immediately on mount
    el.textContent = WORDS[0]

    function type() {
      const word = WORDS[wordIdx]
      charIdx++
      el!.textContent = word.slice(0, charIdx)

      if (charIdx < word.length) {
        timer.current = setTimeout(type, TYPE_SPEED + (Math.random() - 0.5) * 20)
      } else {
        setBlinking(true)
        timer.current = setTimeout(() => {
          setBlinking(false)
          timer.current = setTimeout(erase, DELETE_SPEED + 80)
        }, PAUSE_AFTER)
      }
    }

    function erase() {
      const word = WORDS[wordIdx]
      charIdx--
      el!.textContent = word.slice(0, charIdx)

      if (charIdx > 0) {
        timer.current = setTimeout(erase, DELETE_SPEED + (Math.random() - 0.5) * 8)
      } else {
        wordIdx = (wordIdx + 1) % WORDS.length
        charIdx = 0
        timer.current = setTimeout(type, 160)
      }
    }

    // Begin the cycle after holding the first word
    setBlinking(true)
    timer.current = setTimeout(() => {
      setBlinking(false)
      timer.current = setTimeout(erase, DELETE_SPEED + 80)
    }, PAUSE_AFTER)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <span aria-live="polite" aria-atomic="true">
      <span ref={textRef} />
      <span
        aria-hidden="true"
        className={blinking ? "cursor-blink" : ""}
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.78em",
          background: "currentColor",
          marginLeft: "3px",
          verticalAlign: "middle",
          borderRadius: "1px",
        }}
      />
    </span>
  )
}
