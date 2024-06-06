import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'

export const useClientSession = () => {
  const [session, setSession] = useState<string | null>(null)

  useEffect(() => {
    const localSession = getCookie('session')
    if (localSession) {
      setSession(localSession)
    }
  }, [session])

  return session
}
