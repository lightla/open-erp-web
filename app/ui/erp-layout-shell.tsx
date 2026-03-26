'use client'

import { usePathname } from 'next/navigation'
import { ErpShell } from './erp-shell'
import { ErpPageContent } from './erp-page-content'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/home': {
    title: 'Open ERP Home',
    description:
      'Chọn ứng dụng bạn muốn mở từ sidebar hoặc từ các thẻ bên dưới. Những module chưa hoàn thiện sẽ hiển thị trang coming soon.',
  },
  '/orders': {
    title: 'Order Management',
    description:
      'Nhóm Sale sẽ đi từ đây. Tạm thời mình để trang trắng tinh gọn để bạn nhìn được luồng điều hướng tổng thể trước.',
  },
  '/customers': {
    title: 'Customer Management',
    description:
      'Nơi này sẽ chứa danh sách khách hàng, hồ sơ và các tương tác bán hàng theo tài khoản.',
  },
  '/account': {
    title: 'Account Center',
    description:
      'Nhóm Account để dành cho phần profile, người dùng và quyền truy cập về sau.',
  },
}

export function ErpLayoutShell() {
  const pathname = usePathname()
  const meta = pageMeta[pathname] ?? pageMeta['/home']

  return (
    <ErpShell title={meta.title} description={meta.description}>
      <ErpPageContent />
    </ErpShell>
  )
}
