import { cookieStore as polyfill } from '@/helpers/cookieStorePolyfill'

interface CookieStoreLike {
  get: (name: string) => Promise<{ name: string; value: string } | undefined>;
  set: (name: string, value: string, options?: Record<string, unknown>) => Promise<void>;
  delete: (name: string, path?: string) => Promise<void>;
}


export const cookieStore: CookieStoreLike =
  typeof window !== 'undefined' && 'cookieStore' in window
    ? (window.cookieStore as CookieStoreLike)
    : polyfill
