'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpRight,
  Clock3,
  Layers3,
  ReceiptText,
  ShieldCheck,
  Users,
} from 'lucide-react'

const apps = [
  {
    title: 'Order',
    href: '/orders',
    group: 'Sale',
    description: 'Theo dõi đơn hàng, trạng thái xử lý và luồng bán hàng trung tâm.',
    icon: ReceiptText,
    accent: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Customer',
    href: '/customers',
    group: 'Sale',
    description: 'Quản lý hồ sơ khách hàng, lịch sử mua và thông tin liên hệ.',
    icon: Users,
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Account',
    href: '/account',
    group: 'Account',
    description: 'Thiết lập tài khoản, phân quyền và thông tin người dùng nội bộ.',
    icon: ShieldCheck,
    accent: 'from-violet-500 to-fuchsia-600',
  },
] as const

const comingSoonContent: Record<string, { title: string; description: string }> = {
  '/orders': {
    title: 'Order app is coming soon',
    description:
      'Màn hình quản lý Order sẽ được ghép bảng dữ liệu, chi tiết đơn hàng và form tạo đơn ở bước tiếp theo.',
  },
  '/customers': {
    title: 'Customer app is coming soon',
    description:
      'Mình đã đặt sẵn lối vào từ sidebar. Bước tiếp theo chỉ cần ghép list, detail và API customer thật vào đây.',
  },
  '/account': {
    title: 'Account app is coming soon',
    description:
      'Tạm thời trang này giữ vai trò placeholder trắng gọn như bạn yêu cầu. Mình có thể nối auth/session/profile vào đây sau.',
  },
}

function ComingSoonContent({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex min-h-[calc(100vh-15rem)] flex-col justify-between rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Clock3 className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-700">
          Chức năng này đang được hoàn thiện. Bạn có thể quay lại Home để mở module khác.
        </p>
        <Link
          href="/home"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-900"
        >
          Back to Home
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function HomeContent() {
  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Application Hub
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            Chọn ứng dụng bạn muốn mở
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          <Layers3 className="h-3.5 w-3.5" />
          Workspace
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {apps.map((app) => {
          const Icon = app.icon

          return (
            <Link
              key={app.href}
              href={app.href}
              className="group rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,_#fbfdff_0%,_#f6f9fc_100%)] p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${app.accent} text-white shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {app.group}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-950">{app.title}</h3>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-700" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">{app.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function ErpPageContent() {
  const pathname = usePathname()

  if (pathname === '/home') {
    return <HomeContent />
  }

  const content = comingSoonContent[pathname]

  if (content) {
    return (
      <ComingSoonContent title={content.title} description={content.description} />
    )
  }

  return null
}
