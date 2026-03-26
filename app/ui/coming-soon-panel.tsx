import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'

export function ComingSoonPanel({
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
