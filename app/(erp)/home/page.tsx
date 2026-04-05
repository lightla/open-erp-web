import {
  ReceiptText,
  Users,
  TrendingUp,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/app/ui/page-header'

const stats = [
  {
    label: 'Total Orders',
    value: '128',
    change: '+12%',
    up: true,
    icon: ReceiptText,
    accent: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
  },
  {
    label: 'Customers',
    value: '64',
    change: '+5%',
    up: true,
    icon: Users,
    accent: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  {
    label: 'Revenue',
    value: '$24,500',
    change: '+18%',
    up: true,
    icon: TrendingUp,
    accent: 'from-violet-500 to-fuchsia-600',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
  },
  {
    label: 'Pending Orders',
    value: '14',
    change: '-3%',
    up: false,
    icon: ShoppingCart,
    accent: 'from-orange-400 to-rose-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
  },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'Nguyen Van A', amount: '$320', status: 'completed', date: '2026-04-04' },
  { id: 'ORD-002', customer: 'Tran Thi B', amount: '$150', status: 'pending', date: '2026-04-04' },
  { id: 'ORD-003', customer: 'Le Van C', amount: '$890', status: 'completed', date: '2026-04-03' },
  { id: 'ORD-004', customer: 'Pham Thi D', amount: '$210', status: 'cancelled', date: '2026-04-03' },
  { id: 'ORD-005', customer: 'Hoang Van E', amount: '$540', status: 'pending', date: '2026-04-02' },
]

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle2, cls: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', icon: Clock, cls: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', icon: XCircle, cls: 'bg-rose-100 text-rose-700' },
} as const

export default function HomePage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Tổng quan hoạt động kinh doanh" />
      <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
                >
                  {s.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {s.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Overview
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950">Recent Orders</h2>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Order ID
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Customer
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Amount
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Status
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order) => {
                const s = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = s.icon
                return (
                  <tr key={order.id} className="group">
                    <td className="py-3.5 font-mono text-xs font-semibold text-slate-700">
                      {order.id}
                    </td>
                    <td className="py-3.5 font-medium text-slate-900">{order.customer}</td>
                    <td className="py-3.5 font-semibold text-slate-900">{order.amount}</td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.cls}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500">{order.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}
