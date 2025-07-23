// cookieStorePolyfill.ts

type CookieObject = { name: string; value: string }

export const cookieStore = {
  async get(name: string): Promise<CookieObject | undefined> {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    for (const c of cookies) {
      const [key, ...rest] = c.split('=')
      if (key === name) {
        return { name: key, value: rest.join('=') }
      }
    }
    return undefined
  },

  async set(name: string, value: string, options: { path?: string; expires?: string | Date } = {}): Promise<void> {
    let cookieStr = `${name}=${value}`
    if (options.path) {
      cookieStr += `; path=${options.path}`
    }
    if (options.expires) {
      const dateStr = typeof options.expires === 'string' ? options.expires : options.expires.toUTCString()
      cookieStr += `; expires=${dateStr}`
    }
    document.cookie = cookieStr;
  },

  async delete(name: string, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
  }
};
