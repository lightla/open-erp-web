'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter()

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    window.localStorage.removeItem('currentUser')
    router.replace('/login')
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`mt-3 flex w-full items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 ${
        compact ? 'justify-center' : 'justify-between'
      }`}
      title={compact ? 'Logout' : undefined}
    >
      <span className={`flex items-center ${compact ? '' : 'gap-3'}`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <LogOut className="h-4 w-4" />
        </span>
        {compact ? null : <span className="font-medium">Logout</span>}
      </span>
    </button>
  )
}
