import { useEffect, useState } from 'react'

/**
 * Hook để mô phỏng loading state có thể dùng để hiển thị skeleton loaders
 * Mặc định chỉ loading trong 300ms khi component mount
 */
export function useSimulatedLoading(enabled = true, duration = 300) {
  const [isLoading, setIsLoading] = useState(enabled)

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [enabled, duration])

  return isLoading
}
