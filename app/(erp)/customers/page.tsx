import { Plus, Search, Users, Mail, Phone, MapPin } from 'lucide-react'
import { PageHeader } from '@/app/ui/page-header'

const customers = [
  {
    id: 'CUS-001',
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: 'Hanoi, Vietnam',
    orders: 5,
    totalSpent: 1500000,
    createdAt: '2026-01-10',
  },
  {
    id: 'CUS-002',
    name: 'Tran Thi B',
    email: 'tranthib@example.com',
    phone: '0912345678',
    address: 'Ho Chi Minh City, Vietnam',
    orders: 3,
    totalSpent: 870000,
    createdAt: '2026-01-22',
  },
  {
    id: 'CUS-003',
    name: 'Le Van C',
    email: 'levanc@example.com',
    phone: '0923456789',
    address: 'Da Nang, Vietnam',
    orders: 8,
    totalSpent: 3200000,
    createdAt: '2026-02-05',
  },
  {
    id: 'CUS-004',
    name: 'Pham Thi D',
    email: 'phamthid@example.com',
    phone: '0934567890',
    address: 'Can Tho, Vietnam',
    orders: 2,
    totalSpent: 420000,
    createdAt: '2026-02-18',
  },
  {
    id: 'CUS-005',
    name: 'Hoang Van E',
    email: 'hoangvane@example.com',
    phone: '0945678901',
    address: 'Hue, Vietnam',
    orders: 6,
    totalSpent: 2100000,
    createdAt: '2026-03-01',
  },
]

function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(-2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const avatarColors = [
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-fuchsia-600',
  'from-orange-400 to-rose-500',
  'from-amber-400 to-orange-500',
]

export default function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" description="Quản lý khách hàng" />
      <div className="p-6 space-y-5">
      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm">
          <span className="font-semibold text-slate-900">{customers.length}</span>
          <span className="ml-1.5 text-slate-500">Total Customers</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">Customers</h2>
              <p className="text-xs text-slate-500">{customers.length} records found</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-emerald-400 focus:bg-white"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 text-sm font-semibold text-white shadow transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New Customer
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Since
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((customer, i) => (
                <tr key={customer.id} className="group transition hover:bg-slate-50/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-xs font-bold text-white shadow`}
                      >
                        {getInitials(customer.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{customer.name}</p>
                        <p className="font-mono text-[11px] text-slate-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {customer.address ?? '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {customer.orders} orders
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {formatVND(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{customer.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">
            Showing {customers.length} of {customers.length} customers
          </p>
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
