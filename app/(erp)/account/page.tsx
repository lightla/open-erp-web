import {
  User,
  Mail,
  Shield,
  Key,
  Bell,
  LogOut,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/app/ui/page-header'

const user = {
  name: 'Admin User',
  email: 'admin@openerp.dev',
  role: 'Administrator',
  joinedAt: 'January 2026',
}

const sections = [
  {
    title: 'Profile',
    items: [
      { icon: User, label: 'Full Name', value: user.name },
      { icon: Mail, label: 'Email Address', value: user.email },
      { icon: Shield, label: 'Role', value: user.role },
    ],
  },
]

const menuItems = [
  { icon: Key, label: 'Change Password', description: 'Update your login credentials' },
  { icon: Bell, label: 'Notifications', description: 'Manage alert preferences' },
]

export default function AccountPage() {
  return (
    <>
      <PageHeader title="Account" />
      <div className="p-6 mx-auto max-w-2xl space-y-5">
      {/* Avatar card */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-violet-500 to-fuchsia-600 text-2xl font-bold text-white shadow-lg">
            {user.name
              .split(' ')
              .slice(-2)
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-950">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              Active · {user.role}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Member since {user.joinedAt}
        </div>
      </div>

      {/* Profile fields */}
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-[28px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-slate-950">{section.title}</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Menu items */}
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-semibold text-slate-950">Settings</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="rounded-[28px] border border-rose-100 bg-white shadow-sm">
        <button
          type="button"
          className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-rose-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
            <LogOut className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-rose-600">Sign Out</p>
            <p className="text-xs text-slate-400">Log out of your account</p>
          </div>
          <ChevronRight className="h-4 w-4 text-rose-200" />
        </button>
      </div>
    </div>
    </>
  )
}
