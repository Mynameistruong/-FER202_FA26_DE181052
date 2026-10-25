import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

function useAxios(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  const refetch = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setLoading(true)
    setError(null)

    try {
      const result = await fetcher(controller.signal)
      if (!controller.signal.aborted) {
        setData(result)
      }
      return result
    } catch (requestError) {
      if (!axios.isCancel(requestError) && !controller.signal.aborted) {
        setError(requestError.message || 'Đã xảy ra lỗi.')
      }
      return null
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }, [fetcher])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void refetch()
    }, 0)
    return () => {
      window.clearTimeout(timeout)
      controllerRef.current?.abort()
    }
  }, [refetch])

  return { data, setData, loading, error, refetch }
}

export default useAxios
