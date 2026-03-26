'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRightLeft,
  Building2,
  ChevronRight,
  LayoutGrid,
  MenuSquare,
  ReceiptText,
  ShieldUser,
  Users,
} from 'lucide-react'
import { LogoutButton } from './logout-button'

const navGroups = [
  {
    label: 'Workspace',
    items: [{ href: '/home', label: 'Home', icon: LayoutGrid }],
  },
  {
    label: 'Sale',
    items: [
      { href: '/orders', label: 'Order', icon: ReceiptText },
      { href: '/customers', label: 'Customer', icon: Users },
    ],
  },
  {
    label: 'Account',
    items: [{ href: '/account', label: 'Account', icon: ShieldUser }],
  },
] as const

export function ErpSidebar({
  compact = false,
  onNavigate,
}: {
  compact?: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col rounded-[28px] border border-slate-200/80 bg-white/92 p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur">
      <div
        className={`mb-4 flex items-center rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-4 text-white ${
          compact ? 'justify-center' : 'gap-3'
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-lg shadow-blue-950/20">
          <Building2 className="h-5 w-5" />
        </div>
        {compact ? null : (
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sky-100">Open ERP</p>
            <h1 className="text-lg font-semibold">Core Workspace</h1>
          </div>
        )}
      </div>

      {compact ? null : (
        <div className="mb-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Operation</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Starter Stack</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Live
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 px-3 py-3 text-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sky-100">Apps</p>
              <p className="mt-2 text-xl font-semibold">3</p>
            </div>
            <div className="rounded-2xl border border-slate-200 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Status</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ArrowRightLeft className="h-4 w-4 text-sky-600" />
                Ready
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {compact ? null : (
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {group.label}
              </p>
            )}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex items-center rounded-2xl px-3 py-3 text-sm transition-all ${
                      compact ? 'justify-center' : 'justify-between'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg shadow-blue-200/80'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                    title={compact ? item.label : undefined}
                  >
                    <span className={`flex items-center ${compact ? '' : 'gap-3'}`}>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {compact ? null : <span className="font-medium">{item.label}</span>}
                    </span>
                    {compact ? null : (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          isActive
                            ? 'translate-x-0 text-sky-100'
                            : 'text-slate-300 group-hover:translate-x-0.5'
                        }`}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div
        className={`mt-5 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 ${
          compact ? 'px-0' : ''
        }`}
      >
        <div className={`flex items-center ${compact ? 'justify-center' : 'gap-3'}`}>
          <div className="rounded-2xl bg-white p-2 shadow-sm">
            <MenuSquare className="h-5 w-5 text-sky-700" />
          </div>
          {compact ? null : (
            <div>
              <p className="text-sm font-semibold text-slate-900">More apps soon</p>
              <p className="text-xs text-slate-500">Inventory, Invoice, Purchase</p>
            </div>
          )}
        </div>

        <LogoutButton compact={compact} />
      </div>
    </aside>
  )
}
