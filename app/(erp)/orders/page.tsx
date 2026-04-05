import Link from 'next/link'
import {
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  ReceiptText,
  Search,
} from 'lucide-react'
import { PageHeader } from '@/app/ui/page-header'

const orders = [
  { id: 'ORD-001', customer: 'Nguyen Van A', amount: 320000, status: 'completed', products: 3, date: '2026-04-04' },
  { id: 'ORD-002', customer: 'Tran Thi B', amount: 150000, status: 'pending', products: 1, date: '2026-04-04' },
  { id: 'ORD-003', customer: 'Le Van C', amount: 890000, status: 'completed', products: 5, date: '2026-04-03' },
  { id: 'ORD-004', customer: 'Pham Thi D', amount: 210000, status: 'cancelled', products: 2, date: '2026-04-03' },
  { id: 'ORD-005', customer: 'Hoang Van E', amount: 540000, status: 'pending', products: 4, date: '2026-04-02' },
  { id: 'ORD-006', customer: 'Vu Thi F', amount: 760000, status: 'completed', products: 6, date: '2026-04-01' },
  { id: 'ORD-007', customer: 'Dang Van G', amount: 95000, status: 'pending', products: 1, date: '2026-03-31' },
]

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle2, cls: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', icon: Clock, cls: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', icon: XCircle, cls: 'bg-rose-100 text-rose-700' },
} as const

function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export default function OrdersPage() {
  const total = orders.length
  const pending = orders.filter((o) => o.status === 'pending').length
  const completed = orders.filter((o) => o.status === 'completed').length

  return (
    <>
      <PageHeader title="Orders" description="Quản lý đơn hàng" />
      <div className="p-6 space-y-5">
      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm">
          <span className="font-semibold text-slate-900">{total}</span>
          <span className="ml-1.5 text-slate-500">Total</span>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm">
          <span className="font-semibold text-amber-800">{pending}</span>
          <span className="ml-1.5 text-amber-700">Pending</span>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm">
          <span className="font-semibold text-emerald-800">{completed}</span>
          <span className="ml-1.5 text-emerald-700">Completed</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">Orders</h2>
              <p className="text-xs text-slate-500">{total} records found</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white"
              />
            </div>
            <Link
              href="/orders/create"
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 text-sm font-semibold text-white shadow transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New Order
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => {
                const s = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = s.icon
                return (
                  <tr key={order.id} className="group transition hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-sky-700">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-600">{order.products} items</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatVND(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.cls}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing {total} of {total} orders</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
