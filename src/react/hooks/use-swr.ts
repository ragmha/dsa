import { useState, useEffect, useMemo } from 'react'

/**
useSWR()

E.g

function App() {
  const { data,loading, error } = useSWR('/api', fetcher)
  if (error) return <div>failed</div>
  if (loading) return <div>loading</div>

  return <div>succeeded</div>
}

 */

export function useSWR<T = any, E = any>(
  key: string,
  fetcher: () => T | Promise<T>
) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<E | undefined>(undefined)
  const result = useMemo(fetcher, [key])

  useEffect(() => {
    if (result instanceof Promise) {
      setLoading(true)
      result
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false))
    }
  }, [result])

  return {
    data: result instanceof Promise ? data : result,
    error,
    loading,
  }
}
