import { Spinner } from "./components/Spinner"

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Spinner size="md" />
    </div>
  )
}
