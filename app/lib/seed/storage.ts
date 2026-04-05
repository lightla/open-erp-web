export function storageGet<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : fallback
  } catch {
    return fallback
  }
}

export function storageSet<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(data))
}
