'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Bell, Menu, PanelLeft, Search, Sparkles, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ErpSidebar } from './erp-sidebar'

export function ErpShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedCompact = window.localStorage.getItem('erp-sidebar-compact')
    setCompact(storedCompact === 'true')
    setHydrated(true)
  }, [])

  const toggleCompact = () => {
    setCompact((value) => {
      const nextValue = !value
      window.localStorage.setItem('erp-sidebar-compact', String(nextValue))
      return nextValue
    })
  }

  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_28%),linear-gradient(180deg,_#eff9ff_0%,_#edf2f9_100%)]">
      <div
        className={`grid h-screen gap-4 overflow-hidden p-3 lg:p-5 ${
          hydrated && compact
            ? 'lg:grid-cols-[108px_minmax(0,1fr)]'
            : 'lg:grid-cols-[360px_minmax(0,1fr)]'
        } ${hydrated ? 'lg:opacity-100' : 'lg:opacity-0'} transition-opacity`}
      >
        <div className="relative hidden lg:block lg:h-[calc(100vh-2.5rem)]">
          <div className="h-full">
            <div className="h-full">
              <ErpSidebar compact={hydrated && compact} />
            </div>
            <button
              type="button"
              onClick={toggleCompact}
              className="absolute -right-3 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-950"
              aria-label={hydrated && compact ? 'Expand sidebar' : 'Compact sidebar'}
            >
              <PanelLeft
                className={`h-4 w-4 transition-transform ${hydrated && compact ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100vh-1.5rem)] min-h-0 flex-col overflow-hidden rounded-[34px] border border-white/70 bg-white/82 shadow-[0_28px_90px_-48px_rgba(15,23,42,0.42)] backdrop-blur">
          <header className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  ERP Workspace
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
                <p className="mt-1.5 max-w-2xl text-sm text-slate-500">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full max-w-[280px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search apps, orders, customers"
                  className="h-11 rounded-2xl border-slate-200 bg-white pl-10 shadow-sm"
                />
              </div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-950"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 lg:px-8 lg:py-6">
            {children}
          </main>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar overlay"
          />
          <div className="relative h-full max-w-[88vw] p-3">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/75 text-white"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-full">
              <ErpSidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
