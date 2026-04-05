import { PageHeader } from '@/app/ui/page-header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader
        title="New Order"
        description="Tạo đơn hàng mới"
        action={
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        }
      />
      <div className="p-6">
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-sm font-medium text-slate-500">Create order form coming soon</p>
        </div>
      </div>
    </>
  )
}
