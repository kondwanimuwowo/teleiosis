import { Spinner } from "./components/Spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* White overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner size="md" />
      </div>
    </div>
  )
}
