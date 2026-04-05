import { PageHeader } from '@/app/ui/page-header'
import { Package } from 'lucide-react'

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Danh sách sản phẩm trong hệ thống"
      />
      <div className="p-6">
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <Package className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-500">Products list coming soon</p>
          <p className="mt-1 text-xs text-slate-400">Kết nối useProducts hook ở phase tiếp theo</p>
        </div>
      </div>
    </>
  )
}
