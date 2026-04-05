import { GitBranch } from 'lucide-react'
import { PageHeader } from '@/app/ui/page-header'

export default function WorkflowPage() {
  return (
    <>
      <PageHeader title="Workflow" description="Tự động hoá quy trình nghiệp vụ" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <GitBranch className="h-7 w-7 text-slate-400" />
        </div>
        <p className="text-sm font-semibold text-slate-600">Workflow</p>
        <p className="text-xs text-slate-400">Module đang được phát triển</p>
      </div>
    </>
  )
}
