import { useCookies } from 'next-client-cookies';

export const useClientSession = () => {
  const cookie = useCookies()
  return cookie.get('session')
}
