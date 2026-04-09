'use client'

import { Spinner } from "./components/Spinner"

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        pointerEvents: 'none',
      }}
    >
      <Spinner size="md" />
    </div>
  )
}
