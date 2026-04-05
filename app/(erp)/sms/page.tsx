import { MessageSquare } from 'lucide-react'
import { PageHeader } from '@/app/ui/page-header'

export default function SmsPage() {
  return (
    <>
      <PageHeader title="SMS" description="Gửi tin nhắn SMS tới khách hàng" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <MessageSquare className="h-7 w-7 text-slate-400" />
        </div>
        <p className="text-sm font-semibold text-slate-600">SMS</p>
        <p className="text-xs text-slate-400">Module đang được phát triển</p>
      </div>
    </>
  )
}
